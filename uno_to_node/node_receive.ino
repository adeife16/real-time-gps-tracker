#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include "ThingSpeak.h"

const char* ssid="NodeMCU";
const char* password = "esp8266mod";
const String host = "api.thingspeak.com/";
const int port = 80;
String longitude, latitude, currentLongitude = "0", currentLatitude = "0";
WiFiClient  client;

unsigned long myChannelNumber = 1;
const char * myWriteAPIKey = "C0R5ND9OVYU5GONM";
WiFiServer server(80);
void setup() {
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  Serial.println();
  Serial.print("Wifi connecting to ");
  Serial.println( ssid );

  WiFi.begin(ssid,password);

  Serial.println();
  Serial.print("Connecting");

  while( WiFi.status() != WL_CONNECTED ){
      delay(500);
      Serial.print(".");
  }
  Serial.println("Wifi Connected Success!");
  Serial.print("NodeMCU IP Address : ");
  Serial.println(WiFi.localIP() );
  ThingSpeak.begin(client);  // Initialize ThingSpeak
}

void loop() {
  if (Serial.available() > 0) 
  {
    String data = Serial.readStringUntil('\n');
    Serial.println("");
//    int index = data.indexOf(';');
//    latitude = data.substring(0,index);
//    longitude = data.substring((index+1), data.length());
//    Serial.print("Position: "); 
//    Serial.print("Latitude:");
//    Serial.print(latitude);
//    Serial.print(" ");
//    Serial.print("Longitude:");
//    Serial.println(longitude);
    Serial.println(data);

        // Write to ThingSpeak. There are up to 8 fields in a channel, allowing you to store up to 8 different
    // pieces of information in a channel.  Here, we write to field 1.
    int x = ThingSpeak.writeField(myChannelNumber, 1, data, myWriteAPIKey);

    if(x == 200){
      Serial.println("Data sent to cloud");
    }
    else{
      Serial.println("Problem updating channel. HTTP error code " + String(x));
      Serial.flush();
    }
  }
  else{
    Serial.println("Waiting for Signal");
  }
  delay(15000);
}
