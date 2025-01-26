#! /bin/bash

PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only -c"

# if there are no arguments
# print message saying so
if [[ ! $1 ]]
then
  echo "Please provide an element as an argument."
else
  # if input is a number
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    # try to find a match by atomic number
    ATOMIC_NUMBER=$($PSQL "SELECT atomic_number FROM elements WHERE atomic_number = $1")
  else
    # try to get the element's atomic number by symbol or name
    ATOMIC_NUMBER=$($PSQL "SELECT atomic_number FROM elements WHERE symbol = '$1' OR name = '$1'")
  fi
  # if the element exists in the db
  if [[ ! -z $ATOMIC_NUMBER ]]
  then
    # trim white spaces
    ATOMIC_NUMBER=$ATOMIC_NUMBER | sed 's/ *//g' -E
    QUERY="SELECT atomic_number, symbol, name, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN types USING(type_id) WHERE atomic_number = $ATOMIC_NUMBER"
    # get element info
    echo "$($PSQL "$QUERY")" | while read AN BAR SYMBOL BAR NAME BAR TYPE BAR MASS BAR MELTING BAR BOILING
    do
      # print element info
      echo "The element with atomic number $AN is $NAME ($SYMBOL). It's a $TYPE, with a mass of $MASS amu. $NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."
    done
  else
  # print could not find element message
  echo "I could not find that element in the database."
  fi

fi
