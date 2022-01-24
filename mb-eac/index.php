<!doctype html>
<html lang="en">
<head>
<title>MusicBrainz TOC Submitter</title>
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<link rel="stylesheet" href="style.css" type="text/css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
<script src="plugin.js"></script>
<script src="mbscript.js"></script>
</head>
<body>
    <div id="main">
        <h1>Look up Disc ID and FreeDB ID<br />from EAC/XLD log</h1>
        <p>
        	<img src="curved-arrow-left.svg" type="image/svg+xml" alt="below">
            Paste EAC/XLD CD TOC here
        	<img src="curved-arrow-right.svg" type="image/svg+xml" alt="below">
        </p>
        <textarea id="loginput"></textarea>
        <div id="info" style="display:none;">
            <div id="stats"></div>
                <ul id="lookup">
                    <li><a href="#" target="_blank" id="musicbrainz_link">MusicBrainz disc ID</a></li>
                    <li><a href="#" target="_blank" id="freedb_link">FreeDB</a></li>
                    <li><a href="#" target="_blank" id="mb_freedb_link">FreeDB IDs at MusicBrainz</a></li>
                    <li><a href="#" target="_blank" id="add_release_link">Add release to MusicBrainz (track lengths only)</a> / 
                        <a href="#" target="_blank" id="add_release_link_va">VA release</a></li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
