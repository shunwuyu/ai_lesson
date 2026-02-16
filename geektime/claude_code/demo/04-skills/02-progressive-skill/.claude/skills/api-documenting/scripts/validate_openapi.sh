#!/bin/bash
# OpenAPI Specification Validator
#
# Validates an OpenAPI spec file for correctness.
# Requires: npx (Node.js) or swagger-cli
#
# Usage:
#   ./validate_openapi.sh <spec_file>
#
# Example:
#   ./validate_openapi.sh api-spec.yaml

set -e

SPEC_FILE="$1"

if [ -z "$SPEC_FILE" ]; then
    echo "Usage: $0 <spec_file>"
    echo "Example: $0 api-spec.yaml"
    exit 1
fi

if [ ! -f "$SPEC_FILE" ]; then
    echo "Error: File '$SPEC_FILE' not found"
    exit 1
fi

echo "Validating OpenAPI spec: $SPEC_FILE"
echo "=================================="

# Check if swagger-cli is available
if command -v swagger-cli &> /dev/null; then
    echo "Using swagger-cli..."
    swagger-cli validate "$SPEC_FILE"

# Check if npx is available (Node.js)
elif command -v npx &> /dev/null; then
    echo "Using @apidevtools/swagger-cli via npx..."
    npx @apidevtools/swagger-cli validate "$SPEC_FILE"

# Check if Python spectral is available
elif command -v spectral &> /dev/null; then
    echo "Using Spectral..."
    spectral lint "$SPEC_FILE"

else
    echo "Warning: No OpenAPI validator found."
    echo "Install one of:"
    echo "  - npm install -g @apidevtools/swagger-cli"
    echo "  - npm install -g @stoplight/spectral-cli"
    echo ""
    echo "Performing basic YAML syntax check instead..."

    # Basic YAML check
    if command -v python3 &> /dev/null; then
        python3 -c "import yaml; yaml.safe_load(open('$SPEC_FILE'))" && echo "YAML syntax: OK"
    elif command -v ruby &> /dev/null; then
        ruby -ryaml -e "YAML.load_file('$SPEC_FILE')" && echo "YAML syntax: OK"
    else
        echo "Cannot perform YAML check without Python or Ruby"
        exit 1
    fi
fi

echo ""
echo "Validation complete!"
