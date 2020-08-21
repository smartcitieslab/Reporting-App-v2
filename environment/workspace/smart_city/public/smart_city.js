var map;
var previous_lat; //remembers the last lat and lng in case next filtering yields no results
var previous_lng;
var Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var colors_three = ["#8cf792", "#defc58", "#8e0101"];
var colors_ten = ["#8cf792", "#3aaf40", "#b2fffd", "#328eff", "#defc58", "#a36008", "#ff9bd3", "#ca1eff", "#ff961e", "#8e0101"]; //0,4,9 correspond to 0,1,2 in colors_three
var Global_Function_Count = 0;
//static data
var allPotholes = [

    {
        month: "05",
        year: "2017",
        street: "Grant St",
        latlong: "40.426586, -86.910383",
        sev: 2,
    },

    {
        month: "05",
        year: "2017",
        street: "Grant St",
        latlong: "40.422635, -86.910374",
        sev: 2,
    },
    {
        month: "05",
        year: "2017",
        street: "Grant St",
        latlong: "40.420462, -86.910372",
        sev: 1,
    },
    {
        month: "06",
        year: "2017",
        latlong: "40.424004, -86.916770",
        street: "W State St",
        sev: 3,
    },
    {
        month: "06",
        year: "2017",
        street: "W State St",
        latlong: "40.424361, -86.922291",
        sev: 3,
    },
    {
        month: "06",
        year: "2017",
        street: "W State St",
        latlong: "40.424163, -86.913964",
        sev: 3,
    } //another street
    ,
    {
        month: "06",
        year: "2017",
        street: "Cherry Ln",
        latlong: "40.438788, -86.918136",
        sev: 3,
    },
    {
        month: "06",
        year: "2017",
        street: "Cherry Ln",
        latlong: "40.438788, -86.922770",
        sev: 1,
    }, {
        month: "06",
        year: "2017",
        street: "Cherry Ln",
        latlong: "40.438870, -86.927856",
        sev: 1,
    },
    {
        month: "06",
        year: "2017",
        street: "Cherry Ln",
        latlong: "40.438919, -86.927234",
        sev: 1,
    },
    {
        month: "06",
        year: "2017",
        street: "Cherry Ln",
        latlong: "40.438690, -86.937276",
        sev: 1,
    }
    //lindenber road 40.445782, -86.914865
    ,
    {
        month: "04",
        year: "2017",
        street: "Lindenberg Rd",
        latlong: "40.445782, -86.914865",
        sev: 1,
    },
    {
        month: "03",
        year: "2017",
        street: "Lindenberg Rd",
        latlong: "40.445912, -86.917869",
        sev: 2,
    },
    {
        month: "04",
        year: "2017",
        street: "Lindenberg Rd",
        latlong: "40.446108, -86.921130",
        sev: 3,
    }



];
var allPotholes_DA = [

    {
        month: "05",
        year: "2016",
        latlong: "40.426386, -86.910923",
        sev: 3,
    },

    {
        month: "05",
        year: "2016",

        latlong: "40.422835, -86.910914",
        sev: 3,
    },
    {
        month: "05",
        year: "2016",

        latlong: "40.420662, -86.910922",
        sev: 2,
    },
    {
        month: "06",
        year: "2016",
        latlong: "40.424204, -86.916150",

        sev: 3,
    },
    {
        month: "06",
        year: "2016",

        latlong: "40.424561, -86.922961",
        sev: 1,
    },
    {
        month: "06",
        year: "2016",

        latlong: "40.424363, -86.913134",
        sev: 2,
    } //another street
    ,
    {
        month: "06",
        year: "2016",

        latlong: "40.438588, -86.918966",
        sev: 2,
    },
    {
        month: "06",
        year: "2016",

        latlong: "40.438588, -86.922120",
        sev: 3,
    }, {
        month: "06",
        year: "2016",

        latlong: "40.438670, -86.927116",
        sev: 2,
    },
    {
        month: "06",
        year: "2016",

        latlong: "40.438719, -86.927924",
        sev: 2,
    },
    {
        month: "06",
        year: "2016",

        latlong: "40.438490, -86.937936",
        sev: 3,
    }
    //lindenber road 40.445782, -86.914865
    ,
    {
        month: "04",
        year: "2016",

        latlong: "40.445582, -86.914045",
        sev: 3,
    },
    {
        month: "03",
        year: "2016",

        latlong: "40.445712, -86.917059",
        sev: 2,
    },
    {
        month: "04",
        year: "2016",

        latlong: "40.446308, -86.921960",
        sev: 1,
    }



]

function refresh(x) {
    var Potholes_array;
    if (x == 1 && App_checkbox.checked == true && Data_A_checkbox.checked == false && All_Data_checkbox.checked == false) {
        removing_items_dropdowns();
        date_dropdown_creator(allPotholes);
        street_dropdown_creator(allPotholes);
        Potholes_array = pothole_object_generator(allPotholes);
        draw_routes(Potholes_array, Potholes_array.length);
        severity_dropdown_creator();
        //create sev dropdown
    } else if (x == 1 && App_checkbox.checked == false && Data_A_checkbox.checked == true && All_Data_checkbox.checked == false) {
        removing_items_dropdowns();
        date_dropdown_creator(allPotholes_DA);
        Potholes_array = pothole_object_generator(allPotholes_DA);
        severity_dropdown_creator();
        //create sev dropdown
    } else if (x == 1 && App_checkbox.checked == true && Data_A_checkbox.checked == true && All_Data_checkbox.checked == true) {
        removing_items_dropdowns();
        var new_Array = joined_data(allPotholes, allPotholes_DA);
        date_dropdown_creator(new_Array);
        street_dropdown_creator(allPotholes);
        Potholes_array = pothole_object_generator(allPotholes);
        draw_routes(Potholes_array, Potholes_array.length);
        Global_Function_Count++;
        pothole_object_generator(allPotholes_DA);
        Global_Function_Count = 0;
        severity_dropdown_creator();
        //create sev dropdown
    }
    if (x == 0 && App_checkbox.checked == true && Data_A_checkbox.checked == false && All_Data_checkbox.checked == false) {
        Potholes_array = pothole_object_generator(allPotholes);
        draw_routes(Potholes_array, Potholes_array.length);
    } 
    else if (x == 0 && App_checkbox.checked == false && Data_A_checkbox.checked == true && All_Data_checkbox.checked == false) {
        Potholes_array = pothole_object_generator(allPotholes_DA);
    } 
    else if (x == 0 && App_checkbox.checked == true && Data_A_checkbox.checked == true && All_Data_checkbox.checked == true) {
        Potholes_array = pothole_object_generator(allPotholes);
        draw_routes(Potholes_array, Potholes_array.length);
        Global_Function_Count++;
        pothole_object_generator(allPotholes_DA);
        Global_Function_Count = 0;
        
    }
}

function removing_items_dropdowns() { //removes all items in the dropdown menus
    var date_dropdown_from = document.querySelector("#date_select");
    var sev_dropdown = document.querySelector("#sev");
    var street_dropdown = document.querySelector("#street_select");
    var date_dropdown_to = document.querySelector("#up_to_date");
    var i;

    for (i = 2; i < date_dropdown_from.length; i++) {
        date_dropdown_from.remove(i);
        date_dropdown_to.remove(i - 1);
        i--;
    }
    for (i = 2; i < sev_dropdown.length; i++) {
        sev_dropdown.remove(i);
        i--;
    }
    for (i = 2; i < street_dropdown.length; i++) {
        street_dropdown.remove(i);
        i--;
    }
}

function joined_data(App_Data, Data_A_Data) { //joins the two datasets. Needed for creating the dropdown menus
    var Joined_Data = new Array();
    for (var i = 0; i < (App_Data.length + Data_A_Data.length); i++) {
        if (i < App_Data.length) {
            Joined_Data[i] = App_Data[i];
        } else {
            Joined_Data[i] = Data_A_Data[i - App_Data.length];
        }
    }
    return Joined_Data;
}
// function change_mode(){//failed function
//     if(mode == "APP"){
//         mode = "DA";
//         refresh(1); 
//     }
//     if(mode =="DA"){
//         mode = "APP"; 
//         refresh(1);
//     }
// } //failed
// function street_name_generator(Pothole_data ){//failed function to retreive street names
//   var Pothole_dataPH =  JSON.parse(JSON.stringify(Pothole_data));
//   var geocoder = new google.maps.Geocoder;
//      for(var i = 0; i<Pothole_dataPH.length ;i++){


//     var latlngStr = Pothole_data[i].latlong.split(',', 2);
//       var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
//       geocoder.geocode({'location': latlng}, function(results, status) {

//         if (status === 'OK') {
//             if(results[0]){
//             Pothole_dataPH[i].street = results[0].formatted_address.split(" ")[1]+" "+results[0].formatted_address.split(" ")[2];
//             }
//             else if(results[1]){
//              Pothole_dataPH[i].street = results[1].formatted_address.split(" ")[0]+" "+results[1].formatted_address.split(" ")[1];
//             }


//           } 
//       });
//  }
//  console.log(Pothole_dataPH);
// return Pothole_dataPH;


// } //failed

function render_map(location) {
    //getting the zoom
    var zoom = 15;
    var street_value = document.querySelector("#street_select").value;
    if (street_value == "all") {
        zoom = 14;
    }
    // init map
    var myOptions = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: {
            lat: location.lat,
            lng: location.lng
        },
        zoom: zoom,
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    // initialize(allPotholes.length, allPotholes);
}//the center location only used points from the app data when using the All Data option

function draw_routes(Potholes, length) {

    if (length != 0) {
        var dirRenderer;
        var dirService = new google.maps.DirectionsService();
        //    dirRenderer.setMap(map);
        dirRenderer = new google.maps.DirectionsRenderer({
            suppressMarkers: true,
            preserveViewport: true,
            polylineOptions: {
                strokeColor: colors_three[Potholes[length - 1].sev - 1],//change to ten if needed.
                strokeWeight: 10,
            }
        });

        var potholeobject = {
            origin: Potholes[length - 1].origin,
            destination: Potholes[length - 1].destination,
            travelMode: Potholes[length - 1].travelMode,
            waypoints: Potholes[length - 1].waypoints
        };

        dirService.route(potholeobject, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                dirRenderer.setDirections(result);

            }
        });
        dirRenderer.setMap(map);
        length = length - 1;

        if (length != 0) {

            draw_routes(Potholes, length);
        }
    }

}
//generates the required pothole array of object for the draw function
function pothole_object_generator(Pothole_data) {
    var Date_index = new Array(); //holds the the indexes of the potholes that match the date
    var Severity_index = new Array(); //severity of the street
    var Street_index = new Array();
    var Street_count = new Array(); //lenght of this array is the ammount of objects in the potholes array . The value of of each field will determine the amount of potholes in this street. 
    var Street_info = new Array();
    var Potholes = new Array();
    var PotholesPH = new Array();
    var Street_names = new Array();
    //calls for the sorting functions

    Date_index = date_filter(Pothole_data);
    if ((Global_Function_Count == 1 && All_Data_checkbox.checked == true)) {
        for (var i = 0; i < Pothole_data.length; i++) {
            Street_index[i] = true;
        }
    } else {
        Street_info = street_filter(Pothole_data);
        Street_index = Street_info[0];
        Street_count = Street_info[1];
        Street_names = Street_info[2];
    }

    //


    //
    var sev_avg;
    //
    //creating the array of objects
    var street_count;

    var waypoint_count;
    if (Global_Function_Count == 0) {
        for (var i = 0; i < Street_count.length; i++) {
            PotholesPH[i] = new Object();
            PotholesPH[i] = {
                travelMode: google.maps.TravelMode.WALKING,
                waypoints: []
            }
            street_count = 0;
            waypoint_count = 0;
            sev_avg = 0;
            var waypnt;
            for (var j = 0; j < Pothole_data.length; j++) {
                if (Street_index[j] == true && Date_index[j] != true && Street_names[i] == Pothole_data[j].street) {
                    Street_count[i] = Street_count[i] - 1;
                }
                if (Street_index[j] == true && Date_index[j] == true && Street_names[i] == Pothole_data[j].street) {

                    sev_avg = sev_avg + Pothole_data[j].sev;

                    if (street_count == 0) {
                        PotholesPH[i].origin = new google.maps.LatLng(parseFloat(Pothole_data[j].latlong.split(',')[0]), parseFloat(Pothole_data[j].latlong.split(',')[1]));
                    } else if (street_count == (Street_count[i] - 1)) {
                        PotholesPH[i].destination = new google.maps.LatLng(parseFloat(Pothole_data[j].latlong.split(',')[0]), parseFloat(Pothole_data[j].latlong.split(',')[1]));
                    } else {

                        waypnt = new google.maps.LatLng(parseFloat(Pothole_data[j].latlong.split(',')[0]), parseFloat(Pothole_data[j].latlong.split(',')[1]))
                        PotholesPH[i].waypoints[waypoint_count] = {
                            location: waypnt,
                            stopover: false,
                        };
                        waypoint_count++;
                    }

                    street_count++;

                }
            }

            PotholesPH[i].sev = Math.round(sev_avg / street_count);

        }

        //getting rid of empty objects
        for (i = 0; i < PotholesPH.length; i++) {
            if (PotholesPH[i].origin == null) {
                PotholesPH.splice(i, 1);
                Street_names.splice(i, 1);
                i--;
            }
        }
        Potholes = severity_filter(PotholesPH, Street_names);
    }

    var location = center_location(Pothole_data, Date_index, Street_index, Street_names);
    if (Global_Function_Count == 0) {
        render_map(location);
    }
    //function to draw the markers should go here

    marker_creator(Pothole_data, Pothole_data.length, Date_index, Street_index, Street_names);

    //create new map

    return Potholes
}

function severity_filter(Pothole_Array, Street_names) {
    var sev_selected = document.querySelector("#sev").value;
    for (var i = 0; i < Pothole_Array.length; i++) {
        if (Pothole_Array[i].sev != sev_selected && sev_selected != "all") {
            Pothole_Array.splice(i, 1);
            Street_names.splice(i, 1); //needs to be spliced to  avoid valid streets to appear in this filtering
            i--; //important step. 
        }
    }
    return Pothole_Array;
}

//this function expects the value in the for the date to be the month and year
function date_filter(Pothole_data) {
    var Date_index = new Array();
    var date_selected_from = document.querySelector("#date_select").value;
    var date_selected_to = document.querySelector("#up_to_date").value;
    var month_from;
    var year_from;
    var month_to;
    var year_to;
    var value_from;
    var value_to;
    var date_value;
    if (date_selected_from != "all") {
        month_from = parseFloat(date_selected_from[0] + date_selected_from[1]); //first two characters of the value string
        year_from = parseFloat(date_selected_from[2] + date_selected_from[3] + date_selected_from[4] + date_selected_from[5]); //second four charaters of the value string
        value_from = month_from + year_from * 13;
    }
    if (date_selected_to != "all") {
        month_to = parseFloat(date_selected_to[0] + date_selected_to[1]); //first two characters of the value string
        year_to = parseFloat(date_selected_to[2] + date_selected_to[3] + date_selected_to[4] + date_selected_to[5]); //second four charaters of the value string
        value_to = month_to + year_to * 13;
    }
    for (var i = 0; i < Pothole_data.length; i++) {
        date_value = parseFloat(Pothole_data[i].month) + parseFloat(Pothole_data[i].year) * 13;

        if ((value_from <= date_value && value_to >= date_value) || date_selected_from == "all" || date_selected_to == "all") {
            Date_index[i] = true; //this matches the date filter
        } else {
            Date_index[i] = false;
        }
    }
    return Date_index
}

function street_filter(Pothole_data) {
    var Pothole_dataPH = new Object();
    Pothole_dataPH = JSON.parse(JSON.stringify(Pothole_data));
    var Street_count = new Array();
    var Street_index = new Array();
    var Street_names = new Array();
    var Street_info = new Array(); //holds street count and street index
    var index_count = 0;
    var count = 0;
    var street_selected = document.querySelector("#street_select").value;
    for (var k = 0; k < Pothole_dataPH.length; k++) {
        if (Pothole_dataPH[k].street == street_selected || street_selected == "all") {
            Street_index[k] = true;
        } else {
            Street_index[k] = false;
        }
    }
    for (var i = 0; i < Pothole_dataPH.length; i++) {
        //determining the contents of street count
        count = 0;
        for (var j = i; j < Pothole_dataPH.length; j++) {
            if (Pothole_dataPH[i].street == Pothole_dataPH[j].street) {

                if (j != i) {
                    count++;
                    Pothole_dataPH[j].street = NaN;
                }
            }
        }
        if (count != 0) {
            count++;
            Street_names[index_count] = Pothole_dataPH[i].street;
            Street_count[index_count] = count;
            index_count++;

        }
    }
    var length_street_count = Street_count.length;
    for (var k = 0; k < length_street_count; k++) {
        if (Street_count[k] != Street_count[k]) {
            Street_count.splice(k, 1);
            Street_names.splice(k, 1);
            k--;

        }
    }

    Street_info[0] = Street_index;
    Street_info[1] = Street_count;
    Street_info[2] = Street_names;
    return Street_info;
}

function street_dropdown_creator(Pothole_data) { //creates the dropdown options for the street dropdown
    //hard copy
    var Pothole_dataPH;
    Pothole_dataPH = JSON.parse(JSON.stringify(Pothole_data));

    var Streets = new Array();
    for (var i = 0; i < Pothole_data.length; i++) {
        for (var j = i; j < Pothole_data.length; j++) {
            if (j != i && Pothole_dataPH[i].street == Pothole_dataPH[j].street) {
                Pothole_dataPH[j].street = NaN;
            }
        }
    }

    var street_count = 0;

    for (i = 0; i < Pothole_data.length; i++) {

        if (Pothole_dataPH[i].street == Pothole_dataPH[i].street) {
            Streets[street_count] = Pothole_dataPH[i].street;
            street_count++;
        }
    }

    var street_option;
    var street_txt;
    var street_dropdown = document.querySelector("#street_select");
    //creating the dropdown
    for (i = 0; i < Streets.length; i++) {
        street_option = document.createElement("option");
        street_option.value = Streets[i];
        street_option.textContent = Streets[i];
        street_dropdown.appendChild(street_option);

    }
}

function severity_dropdown_creator() { //still needs to be done
    var mode;
    var severity_Select = document.querySelector("#sev");
    var new_option;
    var txt_options = ["Mild", "Moderate", "Severe"];
    var values = [1, 2, 3];
    var color;
    if (App_checkbox.checked == true && Data_A_checkbox.checked == false) {
        mode = 3;
    } else if (Data_A_checkbox.checked == true) {
        mode = 3;
    }
    for (var i = 0; i < mode; i++) {
        if (mode == 3) {
            new_option = document.createElement("option");
            new_option.value = values[i];
            new_option.textContent = txt_options[i];
            color = "background:" + colors_three[i];
            new_option.setAttribute("style", color);
            severity_Select.appendChild(new_option);
        } else if (mode == 10) {
            new_option = document.createElement("option");
            new_option.value = i + 1;
            new_option.textContent = i + 1;
            color = "background:" + colors_ten[i];
            new_option.setAttribute("style", color);
            severity_Select.appendChild(new_option);
        }
    }
}

function date_dropdown_creator(Pothole_data) {
    //hard copy
    var Pothole_dataPH;
    Pothole_dataPH = JSON.parse(JSON.stringify(Pothole_data));

    var DatesPH = new Array();
    var Dates = new Array();
    var Date_values = new Array();
    for (var i = 0; i < Pothole_data.length; i++) {
        for (var j = i; j < Pothole_data.length; j++) {
            if (j != i && Pothole_dataPH[i].month == Pothole_dataPH[j].month && Pothole_dataPH[i].year == Pothole_dataPH[j].year) {
                Pothole_dataPH[j].month = NaN;
                Pothole_dataPH[j].year = NaN;
            }
        }
    }

    var date_count = 0;
    var Date_values;
    for (i = 0; i < Pothole_data.length; i++) {

        if (Pothole_dataPH[i].month == Pothole_dataPH[i].month) {
            DatesPH[date_count] = Pothole_dataPH[i].month + Pothole_dataPH[i].year;
            Date_values[date_count] = parseFloat(Pothole_dataPH[i].month) + parseFloat(Pothole_dataPH[i].year) * 13
            date_count++;
        }
    }
    //organizing from highest to lowest
    var date_index;
    var max_value = 0;
    for (i = 0; i < DatesPH.length; i++) {
        max_value = 0;
        for (var j = 0; j < DatesPH.length; j++) {
            if (Date_values[j] > max_value) {
                max_value = Date_values[j];
                date_index = j;
            }
        }
        Dates[i] = DatesPH[date_index];
        Date_values[date_index] = 0;
    }

    var date_option;
    var date_txt;
    var date_dropdown = document.querySelector("#date_select");
    var date_dropdown2 = document.querySelector("#up_to_date");
    //creating the dropdown
    for (i = 0; i < Dates.length; i++) {
        date_option = document.createElement("option");
        date_option.value = Dates[i];
        date_txt = Dates[i];
        date_option.textContent = Months[parseFloat(date_txt[0] + date_txt[1]) - 1] + ' ' + date_txt[2] + date_txt[3] + date_txt[4] + date_txt[5];
        date_dropdown.appendChild(date_option);

    }
    for (i = 0; i < Dates.length; i++) {
        if (i == 0) {
            document.querySelectorAll("#up_to_date option")[0].value = Dates[0];
        }
        date_option = document.createElement("option");
        date_option.value = Dates[i];
        date_txt = Dates[i];
        date_option.textContent = Months[parseFloat(date_txt[0] + date_txt[1]) - 1] + ' ' + date_txt[2] + date_txt[3] + date_txt[4] + date_txt[5];
        date_dropdown2.appendChild(date_option);
    }
}

function marker_creator(Pothole_data, length, Date_filter, Street_filter, Street_names) {
    var street_selected = false;
    for (var i = 0; i < Street_names.length; i++) {
        if (Pothole_data[length - 1].street == Street_names[i] && Street_names[i]!=undefined) {
            street_selected = true;
        }
    }

    var current_severity = document.querySelector("#sev").value
    if (Street_filter[length - 1] == true && Date_filter[length - 1] == true && (street_selected || Pothole_data[length - 1].sev == current_severity || current_severity == "all")) {
        debugger;
        var icon;
        if (Pothole_data[length - 1].sev == 1) {
            icon = "CustomMarkers/1.png";
        } else if (Pothole_data[length - 1].sev == 2) {
            icon = "CustomMarkers/5.png";//change to 2 if severity changes to 10 again
        } else if (Pothole_data[length - 1].sev == 3) {
            icon = "CustomMarkers/10.png";

        } else if (Pothole_data[length - 1].sev == 4) {
            icon = "CustomMarkers/4.png";
        } else if (Pothole_data[length - 1].sev == 5) {
            icon = "CustomMarkers/5.png";
        } else if (Pothole_data[length - 1].sev == 6) {
            icon = "CustomMarkers/6.png";
        } else if (Pothole_data[length - 1].sev == 7) {
            icon = "CustomMarkers/7.png";
        } else if (Pothole_data[length - 1].sev == 8) {
            icon = "CustomMarkers/8.png";
        } else if (Pothole_data[length - 1].sev == 9) {
            icon = "CustomMarkers/9.png";
        } else if (Pothole_data[length - 1].sev == 10) {
            icon = "CustomMarkers/10.png";
        }

        var latlong = {
            lat: parseFloat(Pothole_data[length - 1].latlong.split(',')[0]),
            lng: parseFloat(Pothole_data[length - 1].latlong.split(',')[1]),
        }
        var marker = new google.maps.Marker({
            position: latlong,
            map: map,
            title: Pothole_data[length - 1].street,
            icon: icon,
        });
    }
    length = length - 1;
    if (length != 0) {
        marker_creator(Pothole_data, length, Date_filter, Street_filter, Street_names);
    }
}

//center location
function center_location(Pothole_data, Date_filter, Street_filter, Street_names) { //creates an avarage location for the potholes to center the map
    var current_severity = document.querySelector("#sev").value;
    var count_location = 0;
    var lat = 0;
    var long = 0;
    var street_selected = false;
    for (var j = 0; j < Pothole_data.length; j++) {
        for (var i = 0; i < Street_names.length; i++) {
            if (Pothole_data[j].street == Street_names[i]) {
                street_selected = true;
            }
        }
    }
    for (var i = 0; i < Pothole_data.length; i++) {
        if (Street_filter[i] == true && Date_filter[i] == true && (street_selected || Pothole_data[i].sev == current_severity || current_severity == "all")) {
            lat += parseFloat(Pothole_data[i].latlong.split(',')[0]);
            long += parseFloat(Pothole_data[i].latlong.split(',')[1]);
            count_location++;
        }

    }
    if (lat != 0 && long != 0) {
        previous_lat = lat / count_location;
        previous_lng = long / count_location;
    }
    if (lat != 0 && long != 0) {
        var location = {
            lat: lat / count_location,
            lng: long / count_location,
        }
    } else {
        var location = {
            lat: previous_lat,
            lng: previous_lng,
        }
    }

    return location;
}
// Dom manipulation
//Event Listeners for the boxes
// Severity
var selectBox_severity = document.querySelector("#sev");
var click_count = 0;
selectBox_severity.addEventListener("click", function() {
    click_count++;
    click_count1 = 0;
    click_count2 = 0;
    click_count3 = 0;
    if (click_count == 2) {
        refresh(0);

        click_count = 0;
    }
    event.stopPropagation();
}, false);
document.querySelector("body").addEventListener("click", function() {
    click_count = 0;
}, false);

//STREET
var selectBox_street = document.querySelector("#street_select");
var click_count1 = 0;
selectBox_street.addEventListener("click", function() {
    click_count1++;
    click_count = 0;
    click_count2 = 0;
    click_count3 = 0;
    if (click_count1 == 2) {
        refresh(0);

        click_count1 = 0;
    }
    event.stopPropagation();
}, false);
document.querySelector("body").addEventListener("click", function() {
    click_count1 = 0;
}, false);

//DATES From 
var selectBox_dates_from = document.querySelector("#date_select");
var click_count2 = 0;
selectBox_dates_from.addEventListener("click", function() {
    click_count2++;
    click_count1 = 0;
    click_count = 0;
    click_count3 = 0;
    if (click_count2 == 2) {
        refresh(0);

        click_count2 = 0;
    }
    event.stopPropagation();
}, false);
document.querySelector("body").addEventListener("click", function() {
    click_count2 = 0;
}, false);

//DATES TO 
var selectBox_dates_from = document.querySelector("#up_to_date");
var click_count3 = 0;
selectBox_dates_from.addEventListener("click", function() {
    click_count3++;
    click_count2 = 0;
    click_count1 = 0;
    click_count = 0;
    if (click_count3 == 2) {
        refresh(0);

        click_count3 = 0;
    }
    event.stopPropagation();
}, false);
document.querySelector("body").addEventListener("click", function() {
    click_count3 = 0;
}, false);

var App_checkbox = document.querySelector("#App_check");
var Data_A_checkbox = document.querySelector("#Data_A_check");
var All_Data_checkbox = document.querySelector("#All_Data");

//global variables the hold either true or false
var App_checkbox_value = App_checkbox.checked;
var Data_A_checkbox_value = Data_A_checkbox.checked;
var All_Data_checkbox_value = All_Data_checkbox.checked;

App_checkbox.addEventListener("click", function() {

    if (App_checkbox.checked == false && All_Data_checkbox.checked == true) {
        All_Data_checkbox.checked = false;
        App_checkbox.checked = true;
        Data_A_checkbox.checked = false; //uncheck the all data box if app data box is false
    }
    if (App_checkbox.checked == false && All_Data_checkbox.checked == false && Data_A_checkbox.checked == false) {
        App_checkbox.checked = true; //if they are all falsse, then go back to defaul
    }

    if (App_checkbox.checked == true && Data_A_checkbox.checked == true && All_Data_checkbox.checked == false) {
        Data_A_checkbox.checked = false;
    }

    refresh(1);
});

Data_A_checkbox.addEventListener("click", function() {
    if (Data_A_checkbox.checked == false && All_Data_checkbox.checked == true) {
        All_Data_checkbox.checked = false;
        App_checkbox.checked = false;
        Data_A_checkbox.checked = true;
    }
    if (App_checkbox.checked == false && All_Data_checkbox.checked == false && Data_A_checkbox.checked == false) {
        App_checkbox.checked = true; //if they are all false, then go back to default
    }
    if (App_checkbox.checked == true && Data_A_checkbox.checked == true && All_Data_checkbox.checked == false) {
        App_checkbox.checked = false;
    }
    refresh(1);
});

All_Data_checkbox.addEventListener("click", function() {
    //if all is checked, then the other two boxes must be set to true
    App_checkbox.checked = true;
    Data_A_checkbox.checked = true;
    All_Data_checkbox.checked = true;
    refresh(1);
})