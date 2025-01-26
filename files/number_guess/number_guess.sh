#! /bin/bash
PSQL="psql -X --username=freecodecamp --dbname=number_guess --tuples-only -c"

# generate a random number between 1 and 1000
RANDOM_NUMBER=$(( RANDOM % 1000 + 1 ))
NUMBER_OF_TRIES=0

MAIN_LOOP() {
  echo "$1"
  # read number
  read NUMBER_GUESS
  # update number of tries
  (( NUMBER_OF_TRIES++ ))
  # if its not a number
  if [[ ! $NUMBER_GUESS =~ ^[0-9]+$ ]]
  then
    MAIN_LOOP "That is not an integer, guess again:"
  else
    if [[ $NUMBER_GUESS < $RANDOM_NUMBER ]]
    then
      MAIN_LOOP "It's higher than that, guess again:"
    elif [[ $NUMBER_GUESS > $RANDOM_NUMBER ]]
    then
      MAIN_LOOP "It's lower than that, guess again:"
    else
      echo "You guessed it in $NUMBER_OF_TRIES tries. The secret number was $RANDOM_NUMBER. Nice job!"
      # update number of games
      UPDATE_RESULT=$($PSQL "UPDATE users SET games_played = games_played + 1 WHERE username = '$USERNAME'")
      # get current best_game
      BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE username = '$USERNAME'")
      # if new best
      if [[ $NUMBER_OF_TRIES -lt $BEST_GAME || $BEST_GAME -eq -1 ]]
      then
        # update db
        UPDATE_RESULT=$($PSQL "UPDATE users SET best_game = $NUMBER_OF_TRIES WHERE username = '$USERNAME'")
      fi
    fi
  fi
}

# ask for username
echo "Enter your username:"
# get username and trim input
read -r USERNAME

IS_EMPTY=$(echo $USERNAME | wc -m)
# if username is empty
if [[ $IS_EMPTY == 1 ]]
then
  echo "You must input a name"
else
  echo "Hello, $USERNAME"
  # get user id from db
  USER=$($PSQL "SELECT games_played, best_game FROM users WHERE username = '$USERNAME'")
  # if user is not in db
  if [[ -z $USER ]]
  then
    # create user
    USER_RESULT=$($PSQL "INSERT INTO users(username) VALUES ('$USERNAME')")
    # update USER_ID
    USER=$($PSQL "SELECT games_played, best_game FROM users WHERE username = '$USERNAME'")
    # greet user
    echo "Welcome, $USERNAME! It looks like this is your first time here."
  else
    echo "$USER" | while read GAMES_PLAYED BAR BEST_GAME
    do
      echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
    done
  fi
  echo $RANDOM_NUMBER
  # ask for a number
  MAIN_LOOP "Guess the secret number between 1 and 1000:"
fi
