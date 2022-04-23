import { storage, Context,PersistentMap } from "near-sdk-as"
import { Answer, Survey } from "./model"

export function createSurvey(survey_name:string,description:string):Survey{
    return Survey.createSurvey(survey_name,description);
}

export function findSurveyById(survey_id:u32):Survey{
    return Survey.findSurveyById(survey_id);
}

export function getSurveys(offset: u32, limit: u32 = 10):Survey[]{
    return Survey.getSurveys(offset,limit);
}

export function updateSurveyDetail(survey_id:u32,newDescription:string):Survey{
    return Survey.updateSurveyDetail(survey_id,newDescription);
}
export function deleteSurvey(survey_id:u32):void{
    Survey.deleteSurvey(survey_id);
}
export function answerSurvey(survey_id:u32,answer:string):void{
    Survey.answerSurvey(survey_id,answer);
}
export function getAnswers(survey_id:u32):Answer[]{
    return Survey.getAnswers(survey_id);
}


