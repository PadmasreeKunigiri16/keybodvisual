# KeyBod Visual — Analytics & Metrics Engine

## Formulas & Metrics
1. **Gross Words Per Minute (WPM)**:
   $$\text{WPM} = \frac{\text{Total Characters Typed} / 5}{\text{Duration in Minutes}}$$

2. **Net Words Per Minute (Net WPM)**:
   $$\text{Net WPM} = \text{Gross WPM} - \frac{\text{Uncorrected Errors}}{\text{Duration in Minutes}}$$

3. **Accuracy Percentage**:
   $$\text{Accuracy (\%)} = \left( \frac{\text{Correct Keystrokes}}{\text{Total Keystrokes}} \right) \times 100$$

## Heatmap Color Mapping
Key press frequency and key error counts are dynamically mapped onto virtual key backgrounds using RGBA alpha scaling based on relative frequency thresholds.
