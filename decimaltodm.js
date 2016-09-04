// A static class for converting between Decimal and DM formats for a location
// ported from: http://andrew.hedges.name/experiments/convert_lat_long/
// Decimal Degrees = Degrees + minutes/60 + seconds/3600
// more info on formats here: http://www.maptools.com/UsingLatLon/Formats.html
// use: LocationFormatter.DMToDecimal( 45, 35, 38, LocationFormatter.SOUTH );
// or:  LocationFormatter.decimalToDM( -45.59389 );

function LocationFormatter(){
};

LocationFormatter.NORTH = 'N';
LocationFormatter.SOUTH = 'S';
LocationFormatter.EAST = 'E';
LocationFormatter.WEST = 'W';

LocationFormatter.roundToDecimal = function( inputNum, numPoints ) {
 var multiplier = Math.pow( 10, numPoints );
 return Math.round( inputNum * multiplier ) / multiplier;
};

LocationFormatter.decimalToDM = function( location, hemisphere ){
	if( location < 0 ) location *= -1; // strip dash '-'
	
	var degrees = Math.floor( location );          // strip decimal remainer for degrees
	var minutesFromRemainder = ( location - degrees ) * 60;       // multiply the remainer by 60
	var minutes = Math.floor( minutesFromRemainder );       // get minutes from integer
	var minutes_fraction = ( minutesFromRemainder - minutes ) * 1000;

// want output cords of the form "N 38° 01.275 W 084° 27.557 "
	var mintxt = sprintf("%02d.%03d",minutes, minutes_fraction);
	return hemisphere + " " + degrees + '° ' + mintxt + ' ';
};

LocationFormatter.decimalLatToDM = function( location ){
 var hemisphere = ( location < 0 ) ? LocationFormatter.SOUTH : LocationFormatter.NORTH; // south if negative
 return LocationFormatter.decimalToDM( location, hemisphere );
};

LocationFormatter.decimalLongToDM = function( location ){
 var hemisphere = ( location < 0 ) ? LocationFormatter.WEST : LocationFormatter.EAST;  // west if negative
 return LocationFormatter.decimalToDM( location, hemisphere );
};

LocationFormatter.DMToDecimal = function( degrees, minutes, seconds, hemisphere ){
 var ddVal = degrees + minutes / 60 + seconds / 3600;
 ddVal = ( hemisphere == LocationFormatter.SOUTH || hemisphere == LocationFormatter.WEST ) ? ddVal * -1 : ddVal;
 return LocationFormatter.roundToDecimal( ddVal, 5 );  
};


