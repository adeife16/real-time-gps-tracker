#include <SoftwareSerial.h>
#include <TinyGPS.h> 
#include <LiquidCrystal.h> 
int Contrast=50;
LiquidCrystal lcd( 2, 3,  4, 5, 6, 7);

//SoftwareSerial in(8,12);
float lat = 28.5458,lon = 77.1703; // create variable for latitude and longitude object  
String lati, longi, coordinates;
int i = 0;
SoftwareSerial espSerial(10,11);
SoftwareSerial gpsSerial(12,13);//rx,tx 
//LiquidCrystal lcd(A0,A1,A2,A3,A4,A5); 
TinyGPS gps; // create gps object 
void intro(){
  
  lcd.print("GPS REAL-TIME ");
  lcd.setCursor(1,9);
  lcd.print("TRACKER");
//  lcd.scrollDisplayLeft();
  delay(3000); 
  lcd.clear();
  lcd.print("Connecting...      ");
  
}
void setup(){
analogWrite(9, Contrast);
Serial.begin(9600); // connect serial
espSerial.begin(9600);
Serial.println("The GPS Received Signal:"); 
gpsSerial.begin(9600); // connect gps sensor 
lcd.begin(16,2);
intro();
delay(5000);
} 
void loop(){ 
  while(gpsSerial.available()){ // check for gps data 
  while(gps.encode(gpsSerial.read()))// encode gps data 
  {  
  gps.f_get_position(&lat,&lon); // get latitude and longitude 
  // display position 
  lcd.clear(); 
//  lcd.setCursor(1,0); 
//  lcd.print("GPS Signal"); 
  Serial.print("Position: "); 
  Serial.print("Latitude:"); 
  Serial.print(lat,6); 
  Serial.print(";"); 
  Serial.print("Longitude:"); 
  Serial.println(lon,6);
  lati = String(lat, 8);
  longi = String(lon, 8);
  coordinates = lati+","+longi;
  espSerial.print(coordinates);
  Serial.println("Coords Sent!");
  i = 0;
  lcd.setCursor(1,0); 
  lcd.print("LAT:"); 
  lcd.setCursor(5,0); 
  lcd.print(lati); 
  Serial.print(lat); 
  Serial.print(" "); 
  lcd.setCursor(0,1); 
  lcd.print("LON:"); 
  lcd.setCursor(5,1); 
  lcd.print(longi);
//  delay(15000);
 }
}
String latitude = String(lat,6); 
String longitude = String(lon,6); 
Serial.println(latitude+";"+longitude); 
delay(1000);
i++;
Serial.println(i);
} 
