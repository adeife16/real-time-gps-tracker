#include <SoftwareSerial.h>
SoftwareSerial gprsSerial(8,9);
int Contrast=50;
LiquidCrystal lcd( 2, 3,  4, 5, 6, 7);
SoftwareSerial gpsSerial(12,13);//rx,tx 

#include <string.h>
const String host = "api.thingspeak.com/";
const int port = 80; 
TinyGPS gps; // create gps object 
 
void setup()
{
  gprsSerial.begin(9600);               // the GPRS baud rate   
  Serial.begin(9600);    // the GPRS baud rate 
  delay(1000);
  Serial.println("The GPS Received Signal:"); 
  gpsSerial.begin(9600); // connect gps sensor 
  lcd.begin(16,2);
  intro();
  delay(5000);
}
 
void loop()
{
   
   Serial.println("Testing");
   Serial.println(gprsSerial.available());
  if (gprsSerial.available())
    Serial.write(gprsSerial.read());
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
  gprsSerial.println("AT");
  delay(1000);
 
  gprsSerial.println("AT+CPIN?");
  delay(1000);
 
  gprsSerial.println("AT+CREG?");
  delay(1000);
 
  gprsSerial.println("AT+CGATT?");
  delay(1000);
 
  gprsSerial.println("AT+CIPSHUT");
  delay(1000);
 
  gprsSerial.println("AT+CIPSTATUS");
  delay(2000);
 
  gprsSerial.println("AT+CIPMUX=0");
  delay(2000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CSTT=\"gloflat\",\"flat\",\"flat\"");//start task and setting the APN,
  delay(1000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIICR");//bring up wireless connection
  delay(3000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIFSR");//get local IP adress
  delay(2000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIPSPRT=0");
  delay(3000);
 
  ShowSerialData();
  
  gprsSerial.println("AT+CIPSTART=\"TCP\",\"https://api.thingspeak.com/update?api_key=YOUR API KEY HERE&field1=longitude, latitude\",\"80\"");//start up the connection
  delay(6000);
 
  ShowSerialData();
 
  gprsSerial.println("AT+CIPSEND=46");//begin send data to remote server
  delay(4000);
  ShowSerialData();
  

//  gprsSerial.println((char)26);//sending
//  delay(5000);//waitting for reply, important! the time is base on the condition of internet 
//  gprsSerial.println();
 
//  ShowSerialData();
 
  gprsSerial.println("AT+CIPSHUT");//close the connection
  delay(100);
  ShowSerialData();


} 
void ShowSerialData()
{
  while(gprsSerial.available()!=0)
  Serial.write(gprsSerial.read());
  delay(5000); 
  
}
