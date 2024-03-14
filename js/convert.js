function convert(table) {
    var header = ["id"];
    var rows = [];
  
    for (var i = 1; i < table.rows[1].cells.length; i++) {
      if (i < 7) {
        header.push(table.rows[1].cells[i].innerHTML.toLowerCase());
      }
    }
  
    for (var i = 2; i < table.rows.length; i++) {
        var row = {};
        row["id"] = i - 1;
        var images = []
        for (var j = 1; j < table.rows[i].cells.length; j++) {
            if (j >= 7) {
              if (table.rows[i] && table.rows[i].cells[j] && table.rows[i].cells[j].childNodes[0] && table.rows[i].cells[j].childNodes[0].childNodes[0]) {
                images.push(table.rows[i].cells[j].childNodes[0].childNodes[0].src.split("=")[0]);
              }
            } else {
              row[header[j]] = table.rows[i].cells[j].innerHTML;
            }
        }
        row['photos'] = images
        row['preview'] = images[0]
        rows.push(row);
    }
    return rows
  }