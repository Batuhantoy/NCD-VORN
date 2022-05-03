#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$owner" ] && echo "Missing \$owner environment variable" && exit 1

echo
echo 'About to call createSurvey(survey_name: string, description: string) on the contract'
echo near call \$CONTRACT createSurvey '{"survey_name":"'"$survey_name"'",description":"'"$description"'"}' --accountId \$owner
echo
echo \$CONTRACT is $CONTRACT
echo \$owner is $owner
echo \$survey_name is [ $survey_name ]
echo \$description is [ $description ] '(survey description)'
echo 
near call $CONTRACT createSurvey '{"survey_name": "'"$survey_name"'", "description": "'"$description"'"}' --accountId $owner