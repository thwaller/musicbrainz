# musicbrainz

Tools to assist Musicbrainz users.

This set of tools is a a work in progress. As I have time I will continue to add and make improvement, with the next addition being the iTunes Artwork Finder, which should also include the iTunes artist, release and recording search. Those are the two tools in my initial plan, but would like to add more.

This tool set is currently only hosted in GitHub Pages, which only supports static pages which publishes only HTML, CSS, and JavaScript files. Should there be a need for further functionality, I will move it to a VM.

## Project Status

Deployment Status: FAILURE

Current deployment does not include any of the newly added iTunes submodule, which is causing the failure.

### https://thwaller.com/musicbrainz

The site is live. It is not pretty by any means, but it is there for functionality testing.

### TOC Submitter

This module appears to be working and is live. Cosmetics not done.

### iTunes Artwork Finder

Submodule is added. Need to resolve issue of the functionality. The module uses PHP along with JavaScript, and GitHub PAges does not support PHP. Will either convert to entirely JavaScript or host the PHP functionality externally, likely calling on it via Ajax.
