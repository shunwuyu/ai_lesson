#!/usr/bin/env python3
"""
Route Detection Script

Automatically detects API routes in common web frameworks.
Supports: Express.js, FastAPI, Flask, Spring Boot, Go (Gin/Echo)

Usage:
    python detect_routes.py <source_directory>

Output:
    JSON list of detected routes with metadata
"""

import os
import re
import sys
import json
from pathlib import Path

# Route patterns for different frameworks
PATTERNS = {
    'express': [
        # app.get('/path', handler)
        r"app\.(get|post|put|delete|patch)\s*\(\s*['\"]([^'\"]+)['\"]",
        # router.get('/path', handler)
        r"router\.(get|post|put|delete|patch)\s*\(\s*['\"]([^'\"]+)['\"]",
    ],
    'fastapi': [
        # @app.get("/path")
        r"@app\.(get|post|put|delete|patch)\s*\(\s*['\"]([^'\"]+)['\"]",
        # @router.get("/path")
        r"@router\.(get|post|put|delete|patch)\s*\(\s*['\"]([^'\"]+)['\"]",
    ],
    'flask': [
        # @app.route('/path', methods=['GET'])
        r"@app\.route\s*\(\s*['\"]([^'\"]+)['\"].*?methods\s*=\s*\[([^\]]+)\]",
        # @blueprint.route('/path')
        r"@\w+\.route\s*\(\s*['\"]([^'\"]+)['\"]",
    ],
    'spring': [
        # @GetMapping("/path")
        r"@(Get|Post|Put|Delete|Patch)Mapping\s*\(\s*['\"]?([^'\")\s]+)",
        # @RequestMapping(value="/path", method=...)
        r"@RequestMapping\s*\([^)]*value\s*=\s*['\"]([^'\"]+)['\"]",
    ],
    'go_gin': [
        # r.GET("/path", handler)
        r"\w+\.(GET|POST|PUT|DELETE|PATCH)\s*\(\s*['\"]([^'\"]+)['\"]",
    ],
}

def detect_framework(content: str) -> str:
    """Detect which framework is being used based on imports/requires."""
    if 'express' in content.lower() or "require('express')" in content:
        return 'express'
    elif 'fastapi' in content.lower() or 'from fastapi' in content:
        return 'fastapi'
    elif 'flask' in content.lower() or 'from flask' in content:
        return 'flask'
    elif '@RestController' in content or '@RequestMapping' in content:
        return 'spring'
    elif 'gin.Default()' in content or 'echo.New()' in content:
        return 'go_gin'
    return None

def extract_routes(file_path: Path) -> list:
    """Extract routes from a single file."""
    routes = []

    try:
        content = file_path.read_text()
    except Exception as e:
        print(f"Warning: Could not read {file_path}: {e}", file=sys.stderr)
        return routes

    framework = detect_framework(content)
    if not framework:
        return routes

    patterns = PATTERNS.get(framework, [])

    for pattern in patterns:
        matches = re.finditer(pattern, content, re.IGNORECASE | re.MULTILINE)
        for match in matches:
            groups = match.groups()
            if len(groups) >= 2:
                method = groups[0].upper()
                path = groups[1]
            else:
                method = 'GET'  # Default
                path = groups[0]

            routes.append({
                'method': method,
                'path': path,
                'file': str(file_path),
                'line': content[:match.start()].count('\n') + 1,
                'framework': framework,
            })

    return routes

def scan_directory(directory: str) -> list:
    """Scan a directory for route definitions."""
    all_routes = []

    # File extensions to scan
    extensions = {'.js', '.ts', '.py', '.java', '.go', '.kt'}

    path = Path(directory)
    if not path.exists():
        print(f"Error: Directory {directory} does not exist", file=sys.stderr)
        sys.exit(1)

    for file_path in path.rglob('*'):
        if file_path.suffix in extensions and file_path.is_file():
            # Skip node_modules, venv, etc.
            if any(skip in str(file_path) for skip in ['node_modules', 'venv', '.git', 'dist', 'build']):
                continue

            routes = extract_routes(file_path)
            all_routes.extend(routes)

    return all_routes

def main():
    if len(sys.argv) < 2:
        print("Usage: python detect_routes.py <source_directory>", file=sys.stderr)
        sys.exit(1)

    directory = sys.argv[1]
    routes = scan_directory(directory)

    # Sort by path for readability
    routes.sort(key=lambda r: (r['path'], r['method']))

    # Output as JSON
    print(json.dumps(routes, indent=2))

    # Summary to stderr
    print(f"\nFound {len(routes)} routes in {directory}", file=sys.stderr)

if __name__ == '__main__':
    main()
