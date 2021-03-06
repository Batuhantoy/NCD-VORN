## Usage

### Getting started

INSTALL `NEAR CLI` first like this: `npm i -g near-cli`


  To clone this project first go in to the folder that you are going to clone this project then fallow these steps

    git clone https://github.com/Batuhantoy/NCD-VORN.git

    yarn
    
  Deploy to dev account(testnet)

    yarn build:release

    near dev-deploy ./build/release/contract.wasm

    export CONTRACT=<YOUR_DEV_ACCOUNT>


### Project Description

  İn this project you can earn NEAR tokens by taking Surveys or you can make Surveys but it coust you 2 NEAR tokens

  Lets create a Survey
  
    near call $CONTRACT createSurvey '{"survey_name":"Car Colors","description":"Best car colour?"}' --accountId batuhantoy.testnet

  We can update our Survey detail by its id
  
    near call $CONTRACT updateSurveyDetail '{"survey_id":1381722610,"newDescription":"Best car colour for you?"}' --accountId batuhantoy.testnet
  
  Delete a Survey by its id(you need to be the owner of the Survey to delete a Survey)
  
    near call $CONTRACT deleteSurvey '{"survey_id":1381722610}' --accountId batuhantoy.testnet

  Answer a Survey by its id
  
    near call $CONTRACT answerSurvey '{"survey_id":1381722610,"answer":"blue"}' --accountId batuhantoy.testnet

  We can find a Survey by its id
  
    near view $CONTRACT findSurveyById '{"survey_id":1381722610}'

  We can see all the Surveys
  
    near view $CONTRACT getSurveys '{"offset":0}'
    
  We can see the given answers
  
    near view $CONTRACT getAnswers '{"survey_id":1381722610}'



Here is my loom video for this project

    https://www.loom.com/share/30c6f36403ad456d949a7746258a867d


Creating sub-account

    Example : near create-account a.batuhantoy.testnet --masterAccount batuhantoy.testnet


To clear yarn cache and reset the contract go into your terminal

    yarn clean cache
  
    yarn install
  
    npm install



You can also use scripts to call this smart contract functions

After you clone this repo to a local folder
1. Deploy the contract

     `./scripts/1.dev-deploy.sh`
     
2. Create a Survey

     `./scripts/2.create_survey.sh <SURVEY_NAME> <DETAİL ABOUT SURVEY>`
     
3. Answer a Survey

     `./scripts/3.answer_survey.sh <SURVEY_ID> <YOUR_ANSWER>`
     
4. Update a Survey Detail

     `./scripts/4.updateDetail.sh <SURVEY_ID> <NEW_DETAİL>`
     
5. You can reset the contract 
 
     `./scripts/5.cleanup.sh`




Please note that, in order to create the AssemblyScript and tests folder structure, you may use the command `asp --init` which will create the following folders and files:

```
./assembly/
./assembly/tests/
./assembly/tests/example.spec.ts
./assembly/tests/as-pect.d.ts
```
