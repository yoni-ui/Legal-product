# Design System Document

## 1. Overview & Creative North Star: "The Digital Jurist"

The design system is built upon the concept of **The Digital Jurist**. In the legal world, authority is derived from clarity, precision, and history. In the AI world, it is derived from speed, intelligence, and transparency. This system bridges those two worlds by utilizing a "High-End Editorial" aesthetic—combining the expansive whitespace of a premium legal brief with the immersive, layered depth of next-generation computing.

We move beyond the "template" look by rejecting rigid, outlined grids. Instead, we use **intentional asymmetry** and **tonal depth** to guide the eye. Information isn't just displayed; it is curated. By layering semi-transparent surfaces and utilizing high-contrast typography scales, we create an environment that feels both intellectually authoritative and technologically advanced.

---

## 2. Colors: Tonal Architecture

This system uses color not just for decoration, but as a structural tool to define hierarchy and focus.

### The Palette
- **Primary Action (`primary` #adc6ff / `primary_container` #4d8eff):** A vibrant, high-energy blue that commands attention against the dark canvas.
- **Surface Neutrals (`surface` #111317 to `surface_container_highest` #333539):** A sophisticated range of deep charcoals and obsidians.
- **Accents (`secondary` #b7c4ff):** Used for supporting elements and softer calls to action.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off the interface. We define boundaries through background color shifts. A section should transition from `surface` to `surface_container_low` to denote a change in context. This creates a seamless, fluid experience that feels "carved" rather than "assembled."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface-container` tiers to create depth:
1.  **Level 0 (Background):** `surface` (#111317)
2.  **Level 1 (Sectioning):** `surface_container_low` (#1a1c20)
3.  **Level 2 (Cards/Modules):** `surface_container` (#1e2024)
4.  **Level 3 (Interactive/Floating):** `surface_container_high` (#282a2e)

### The "Glass & Gradient" Rule
To evoke the "AI" soul, use **Glassmorphism** for floating elements (like chat bubbles or hover cards). Apply `backdrop-blur: 20px` combined with a semi-transparent `surface_variant`. 
**Signature Gradients:** For primary CTAs, use a linear gradient from `primary` to `primary_container` at a 135-degree angle. This adds a "lithic" glow that flat hex codes cannot replicate.

---

## 3. Typography: Editorial Authority

We use a dual-typeface system to balance modern tech with legal precision.

*   **Display & Headlines (Manrope):** Chosen for its geometric stability and wide apertures. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero sections to create a bold, editorial impact.
*   **Body & Labels (Inter):** The workhorse of the system. Inter provides maximum legibility for complex legal text. 
*   **The Scale:** We use a high-contrast scale. Large headlines sit near small, tracked-out labels (`label-md`). This "big and small" approach mimics high-end magazine layouts, moving away from the "medium-everything" look of generic SaaS platforms.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows and borders are replaced by **Tonal Layering**. Depth is an environmental property, not an effect.

*   **The Layering Principle:** A card should feel like it is resting *on* the surface. Achieve this by placing a `surface_container_highest` element over a `surface` background.
*   **Ambient Shadows:** If a "floating" state is required (e.g., a modal), use an ultra-diffused shadow: `box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.5)`. The shadow must never look like a "drop" shadow; it should look like ambient occlusion.
*   **The "Ghost Border" Fallback:** For accessibility in forms, use the `outline_variant` token at **15% opacity**. It should be felt, not seen—a "whisper" of a boundary.
*   **Glassmorphism:** For the AI Chat Interface, use `surface_bright` at 60% opacity with a heavy blur. This ensures the chat feels like a "lens" over the legal data.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`), rounded-xl (1.5rem). No border.
*   **Secondary:** Glass effect. Semi-transparent `surface_variant` with a 1px "Ghost Border."
*   **Tertiary:** Text only in `primary_fixed`, with a subtle underline on hover.

### AI Chat Elements
*   **User Input:** `surface_container_highest` with a `xl` (1.5rem) corner radius.
*   **AI Response:** `surface_container_low` with a subtle gradient "shimmer" on the leading edge to indicate active processing.
*   **Floating Prompt Chips:** Selection chips using `secondary_container` with `full` (9999px) roundness.

### Feature Cards & Pricing
*   **Rule:** Forbid divider lines. 
*   **Implementation:** Use `surface_container` for the card body. Use vertical white space (32px or 48px) to separate the title, price, and feature list. Highlight the "Pro" plan by using a `surface_bright` background and a subtle `primary` glow.

### Input Fields
*   **State:** Default state uses `surface_container_highest`. Focus state adds a 1px "Ghost Border" of `primary` at 40% opacity.
*   **Typography:** Helper text must use `label-sm` in `on_surface_variant` to maintain a clean, professional hierarchy.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. For example, a hero headline might be left-aligned while the supporting visual is offset to the right-bottom.
*   **Do** prioritize whitespace. In legal contexts, breathing room equals "Trust."
*   **Do** use `primary_fixed_dim` for text links on dark backgrounds to ensure AAA accessibility.

### Don't
*   **Don't** use 100% opaque, high-contrast borders. They "trap" the design and make it look dated.
*   **Don't** use pure black (#000000). Always use the `background` token (#111317) to maintain tonal depth.
*   **Don't** use standard "drop shadows." Use background color shifts and backdrop blurs to define layers.
*   **Don't** crowd the interface. If an element isn't serving the user's immediate goal, increase its transparency or remove it.