# AirportOS Landing Page

A static, responsive landing page for the AirportOS Design Partner Program.

## Safest GitHub Pages installation

1. Open the repository that currently hosts `ezdavis.com`.
2. Create a new folder in the repository root named `airportos`.
3. Upload these three files into that folder:
   - `index.html`
   - `styles.css`
   - `script.js`
4. Commit the changes.
5. Visit `https://ezdavis.com/airportos/`.

This folder-based approach does **not** replace the main site's root `index.html`.

## Form behavior

The current form opens a pre-filled email to `ezekiel@ezdavis.com`. This works on a static GitHub Pages site without a backend, but it is only a launch fallback.

For automatic signup tracking, replace the submit handler in `script.js` with an endpoint from Formspree, Tally, Airtable, ConvertKit, Mailchimp, or another form/CRM provider.

## Recommended next upgrade

Use a hosted form endpoint so submissions are recorded automatically even if the visitor does not complete the email in their mail app.
