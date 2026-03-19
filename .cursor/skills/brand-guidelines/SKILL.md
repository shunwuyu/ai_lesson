---
name: brand-guidelines
description: Apply brand voice and visual/style rules from provided brand guidelines to generated copy and UI content. Use when the user asks for brand-compliant marketing materials, rewrites in a specific brand tone, or provides brand guidelines to follow.
---

# Brand Guidelines Compliance

## Instructions
Use this skill to ensure generated content matches the brand’s rules (voice, terminology, and visual/style constraints).

### Step 1: Collect inputs
Before writing the final deliverable, confirm or extract:
- The deliverable type (landing page copy, email, social post, UI labels, design spec, etc.)
- The target audience and channel (if provided)
- The brand guidelines source (text pasted by the user, an uploaded doc, or a link)
- Any hard constraints (must-use phrases, legal requirements, forbidden claims, length limits)

If critical brand info is missing (for example, color palette, logo rules, or tone of voice), ask targeted questions before final output.

### Step 2: Extract brand rules (from the provided guidelines)
Create a concise “Brand Rules” summary containing (as available):
- Voice & tone: formality level, personality traits, do/don’t wording, terminology rules
- Copy style: punctuation, capitalization rules, reading level, CTA style
- Visual/style tokens (if relevant): color palette (with codes), typography (font families/weights/sizes), spacing/grid, imagery style
- Logo usage (if relevant): allowed lockups, minimum size, clear-space rules, placement rules
- Accessibility constraints (if provided): contrast expectations, color-blind safe pairings

When the guidelines are ambiguous, record assumptions explicitly.

### Step 3: Apply rules to the output
While generating the deliverable:
- Follow terminology and voice rules exactly
- Use the provided visual tokens when the output includes styles/specs (e.g., CSS variables, design tokens, or UI mock copy labels)
- Avoid forbidden wording/claims and use approved alternates
- Keep formatting consistent with the brand guidance (headings, capitalization, punctuation)

### Step 4: Self-check before responding
Add a short compliance section:
- `Applied rules:` list the key brand rules that were applied
- `Assumptions:` list any inferred or missing information you had to assume
- `Potential gaps:` list anything that might violate the brand rules if the guidelines differ

## Examples
### Example 1: Rewrite copy in brand voice
Input (user): “Rewrite this onboarding email to match our brand tone. Guidelines: friendly, concise, no exclamation marks, use ‘dashboard’ not ‘panel’.”
Expected approach:
1. Extract voice rules (friendly, concise, no exclamation marks, terminology).
2. Rewrite the email copy using only approved terms and formatting.
3. Add `Brand compliance notes` describing applied rules.

### Example 2: UI text + tokens
Input (user): “Create a settings screen copy and provide button/link style tokens based on our palette. Palette: Primary #0057FF, Text #111827. Typography: Inter, 14px for body.”
Expected approach:
1. Extract palette + typography tokens.
2. Generate UI label copy consistent with tone.
3. Provide token suggestions (for example, `--color-primary`, `--font-body-size`) if style output is requested.

