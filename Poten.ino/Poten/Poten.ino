void setup() 
{
  Serial.begin(9600);
}
int pot, scale=0;
int counter=0;
void loop() 
{
  pot = analogRead(A0);
  scale = (pot/10.24)+20;
  if(scale>70 && counter<=300)
  {
    Serial.println(scale);
    counter++;
  }
  delay(50);
}
