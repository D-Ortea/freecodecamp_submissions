#! /bin/bash
PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"
echo -e "\n~~~~~ MY SALON ~~~~~\n"

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  else
    echo -e "Welcome to My Salon, how can I help you?\n"
  fi
  SERVICES_MENU
}

CREATE_CUSTOMER() {
  echo -e "\nI don't have a record for that phone number, what's your name?"
  read CUSTOMER_NAME
  if [[ -z $CUSTOMER_NAME ]]
  then
    MAIN_MENU "You must input a name!"
  else
    CUSTOMER_CREATE_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES ('$1', '$CUSTOMER_NAME')")
  fi
}

BOOK_APPOINTMENT() {
  echo -e "\nWhat's your phone number?"
  read CUSTOMER_PHONE
  # if the phone number is null
  if [[ -z $CUSTOMER_PHONE ]]
  then
    # return to main menu
    MAIN_MENU "You must input a phone number!"
  else
    # check if customer exists
    CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
    # if it doesn't exist
    if [[ -z $CUSTOMER_NAME ]]
    then
      # create customer
      CREATE_CUSTOMER $CUSTOMER_PHONE
      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
    fi
    echo -e "\nWhat time would you like your cut, $CUSTOMER_NAME?"
    read SERVICE_TIME
    # check if appointment is null
    if [[ -z SERVICE_TIME ]]
    then
      MAIN_MENU "You must input an appointment time!"
    else
      # get customer id
      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")
      # get service name
      SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $1")
      # create appointment
      APPOINTMENT_CREATE_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES ($CUSTOMER_ID, $1, '$SERVICE_TIME')")
      # notify the customer
      echo -e "\nI have put you down for a$SERVICE_NAME at $SERVICE_TIME,$CUSTOMER_NAME."
    fi

  fi
}

SERVICES_MENU() {
  # Get services from db
  SERVICE_NAMES=$($PSQL "SELECT service_id, name FROM services ORDER BY service_id")
  # If no services available
  if [[ -z $SERVICE_NAMES ]]
  then
    echo "Sorry, we don't have any service available right now"
  else
    # Show all service options
    echo "$SERVICE_NAMES" | while read SERVICE_ID BAR SERVICE_NAME
    do
      echo -e "$SERVICE_ID) $SERVICE_NAME"
    done
    # Get service choice
    read SERVICE_ID_SELECTED
    # Check if choice is a number
    if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
    then
      MAIN_MENU "That is not a valid service number"
    else
      #Check if choice id is in db
      SERVICE_CHOICE_RESULT=$($PSQL "SELECT * FROM services WHERE service_id=$SERVICE_ID_SELECTED")
      # If not on db
      if [[ -z $SERVICE_CHOICE_RESULT ]]
      then
        # return to main menu
        MAIN_MENU "The service number $SERVICE_ID_SELECTED doesn't exist"
      else
        # book appointment
        BOOK_APPOINTMENT $SERVICE_ID_SELECTED
      fi
    fi
  fi

}

MAIN_MENU
