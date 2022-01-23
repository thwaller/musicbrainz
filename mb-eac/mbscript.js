//<![CDATA[
/*!
 * Lookup musicbrainz and freedb by EAC log
 * https://gist.github.com/kolen/766668
 *
 * Copyright 2018, Konstantin Mochalov
 * Released under the MIT License
 */
    var SECTORS_PER_SECOND = 75
    var PREGAP = 150
    var DATA_TRACK_GAP = 11400
    var toc_entry_matcher = new RegExp(
                "^\\s*"+
                "(\\d+)"+  // 1 - track number
                "\\s*\\|\\s*"+
                "([0-9:.]+)"+ // 2 - time start
                "\\s*\\|\\s*"+
                "([0-9:.]+)"+ // 3 - time length
                "\\s*\\|\\s*"+
                "(\\d+)"+ // 4 - start sector
                "\\s*\\|\\s*"+
                "(\\d+)"+ // 5 - end sector
                "\\s*$"
    )
    var log_input_to_entries = function(text) {
        var entries = []
        $.each(text.split("\n"), function(index, value) {
            var m = toc_entry_matcher.exec(value)
            if (m) {
                entries.push(m)
            }
        })
        return entries
    }
    var get_layout_type = function(entries) {
        var type = "standard"
        for (var i=0; i<entries.length-1; i++) {
            var gap = parseInt(entries[i+1][4]) - parseInt(entries[i][5]) - 1
            if (gap != 0) {
                if (i == entries.length-2 && gap == DATA_TRACK_GAP) {
                    type = "with_data"
                } else {
                    type = "unknown"
                    break
                }
            }
        }
        return type
    }
    var calculate_mb_toc_numbers = function(entries) {
        if (entries.length == 0) {
            return null
        }
        var leadout_offset = parseInt(entries[entries.length - 1][5]) + PREGAP + 1
        var offsets = $.map(entries, function(entry) {
            return parseInt(entry[4]) + PREGAP
        })
        return [1, entries.length, leadout_offset].concat(offsets)
    }
    var calculate_cddb_id = function(entries) {
        var sum_of_digits = function(n) {
        var sum = 0;
        while (n > 0) {
            sum = sum + (n % 10);
            n = Math.floor(n / 10);
        }
        return sum;
        }
        var decimalToHexString = function(number) {
            if (number < 0) {
                number = 0xFFFFFFFF + number + 1;
            }
            return number.toString(16).toUpperCase();
        }
        var length_seconds = Math.floor((parseInt(entries[entries.length-1][5]) - parseInt(entries[0][4]) + 1)
            / SECTORS_PER_SECOND)
        var checksum = 0
        $.each(entries, function(index, entry) {
            checksum += sum_of_digits(Math.floor((parseInt(entry[4]) + PREGAP) / SECTORS_PER_SECOND))
        })
        var xx = checksum % 255
        var discid_num = (xx << 24) | (length_seconds << 8) | entries.length
        //return discid_num
        return decimalToHexString(discid_num)
    }
    var make_add_release_url = function(entries, va) {
        var url = "https://musicbrainz.org/cdi/enter.html"
        if (va) {
            url += "?hasmultipletrackartists=1&artistid=1"
        } else {
            url += "?hasmultipletrackartists=0&artistid=2"
        }
        url += "&artistedit=1&artistname="
        url += "&releasename="
        $.each(entries, function(index, entry) {
            var num = parseInt(entry[1]) - 1
            var time = entry[3].replace(/\..*$/, "")

            url += "&track"+num+"="
            url += "&tracklength"+num+"="+time
        })
        url += "&tracks="+entries.length
        return url
    }
    $(document).ready(function(){
        var update = function() {
            var entries = log_input_to_entries($('#loginput').val())
            var layout_type = get_layout_type(entries)
            var entries_audio
            if (layout_type == "with_data") {
                entries_audio = entries.slice(0, entries.length-1)
            } else {
                entries_audio = entries
            }
            if (entries.length > 0) {
                var mb_toc_numbers = calculate_mb_toc_numbers(entries_audio)
                var cddb_id = calculate_cddb_id(entries)
                $("#musicbrainz_link").attr('href',
                    "https://musicbrainz.org/cdtoc/attach?toc="+mb_toc_numbers.join("%20"))
                $("#freedb_link").attr('href',
                    "https://www.freedb.org/freedb_discid_check.php?discid="+cddb_id)
                $("#mb_freedb_link").attr('href',
                    "https://musicbrainz.org/search/textsearch.html?query=discid:("+cddb_id+")&type=freedb&adv=on&handlearguments=1")
                $("#add_release_link").attr('href',
                    make_add_release_url(entries_audio))
                $("#add_release_link_va").attr('href',
                    make_add_release_url(entries_audio, true))
                var length_secs = Math.floor(parseInt(entries_audio[entries_audio.length-1][5]) / SECTORS_PER_SECOND)
                var length_dottime = Math.floor(length_secs / 60) + ":" + (length_secs % 60)
                if (layout_type == "standard") {
                    $("#stats").html("<strong>"+entries.length+"</strong> tracks, total time: "+length_dottime)
                } else if (layout_type == "with_data") {
                    $("#stats").html("<strong>"+entries_audio.length+"</strong> tracks + <strong>1</strong> data track, total time: "
                    +length_dottime)
                } else {
                    $("#stats").html("<strong>Warning! Non-standard layout!</strong>")
                }
                $("#info").slideDown();
            } else {
                $("#info").slideUp();
            }
        }
        $('#loginput').bind("textchange", update)
        update()
    })
//]]>
