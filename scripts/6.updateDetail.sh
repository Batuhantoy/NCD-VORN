#!/usr/bin/env bash
set -e

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$owner" ] && echo "Missing \$owner environment variable" && exit 1

echo
echo 'About to call updateSurveyDetail(survey_id:u32,newDescription:string) on the contract'
echo near call \$CONTRACT updateSurveyDetail '{"survey_id":"'$survey_id'","newDescription":"'"$newDescription"'"}' --accountId \$owner
echo
echo \$CONTRACT is $CONTRACT
echo \$owner is $owner
echo \$survey_id is [ $survey_id ]
echo \$newDescription is [ $newDescription ] '(new survey Description)'
echo 
near call $CONTRACT updateSurveyDetail '{"survey_id": "'$survey_id'", "newDescription": "'"$newDescription"'"}' --accountId $owner