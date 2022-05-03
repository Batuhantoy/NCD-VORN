#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$owner" ] && echo "Missing \$owner environment variable" && exit 1

echo
echo 'About to call answerSurvey(survey_id:u32,answer:string) on the contract'
echo near call \$CONTRACT answerSurvey '{"survey_id":"'$survey_id'","answer":"'"$answer"'"}' --accountId \$owner
echo
echo \$CONTRACT is $CONTRACT
echo \$owner is $owner
echo \$survey_id is [ $survey_id ]
echo \$answer is [ $answer ] '(survey answer)'
echo 
near call $CONTRACT answerSurvey '{"survey_id": "'$survey_id'", "answer": "'"$answer"'"}' --accountId $owner