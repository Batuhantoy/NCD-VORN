import {
  storage,
  Context,
  PersistentMap,
  u128,
  math,
  context,
  PersistentUnorderedMap,
  Storage,
  ContractPromiseBatch,
  logging,
  PersistentVector,
  PersistentSet,
} from "near-sdk-as";
import {
  toYocto,
  XCC_GAS,
  assert_self,
  assert_single_promise_success,
  AccountId,
} from "../../utils";

export const surveys = new PersistentUnorderedMap<u32, Survey>("s");
export const answers = new PersistentVector<Answer>("a");
const dev: string = "dev-1650701188636-41310751316204";//change it with your dev account
@nearBindgen
export class Survey {
  survey_id: u32;
  survey_owner: string;
  survey_name: string;
  description: string;
  constructor(survey_name: string, description: string) {
    this.survey_id = math.hash32<string>(survey_name);
    this.survey_owner = context.sender;
    this.survey_name = survey_name;
    this.description = description;
  }
  @mutateState()
  on_complete(): void {
    assert_self();
    assert_single_promise_success();
    logging.log("Transfer Completed");
  }
  static createSurvey(survey_name: string, description: string): Survey {
    const survey = new Survey(survey_name, description);
    const sendedTo = ContractPromiseBatch.create(dev); 
    const price=toYocto(2);
    const sending = sendedTo.transfer(price);
    sending
      .then(context.sender)
      .function_call("on_complete", "{}", u128.Zero, XCC_GAS);
    surveys.set(survey.survey_id, survey);
    return survey;
  }

  static findSurveyById(survey_id: u32): Survey {
    //finds survey by id
    assert(surveys.contains(survey_id), "There is no such a Survey");
    return surveys.getSome(survey_id);
  }
  static getSurveys(offset: u32, limit: u32): Survey[] {
    return surveys.values(offset, offset + limit);
  }
  static updateSurveyDetail(survey_id: u32, newDescription: string): Survey {
    const survey = this.findSurveyById(survey_id);
    assert(surveys.contains(survey_id), "There is no such a Survey");
    assert(
      context.sender == survey.survey_owner,
      "You are not the Survey owner"
    );

    survey.description = newDescription;
    surveys.set(survey_id, survey);
    return survey;
  }
  static deleteSurvey(survey_id: u32): void {
    const survey = this.findSurveyById(survey_id);
    assert(surveys.contains(survey_id), "There is no such a Survey");
    assert(
      context.sender == survey.survey_owner,
      "You are not the Survey owner"
    );
    surveys.delete(survey_id);
  }
  static answerSurvey(survey_id: u32, answer: string): Answer {
    assert(surveys.contains(survey_id), "There is no such a Survey");
    const c_answer = new Answer(survey_id,answer);

    const sendedTo = ContractPromiseBatch.create(context.sender); 
    const price=toYocto(0.8);
    const sending = sendedTo.transfer(price);
    sending
      .then(dev)
      .function_call("on_complete", "{}", u128.Zero, XCC_GAS);

    answers.push(c_answer);
    return c_answer;
  }

  static getAnswers(survey_id:u32): Answer[] {
    assert(surveys.contains(survey_id), "There is no such a Survey");
    const numAnswers=min(10,answers.length);
    const startIndex = answers.length-numAnswers;
    const result = new Array<Answer>(numAnswers);
    for(let i=0;i<answers.length;i++){
      result[i]=answers[i+startIndex];
    }
    return result;
  }
}
@nearBindgen
export class Answer {
  survey_id:u32;
  answerer:string;
  //We construct answer public because same survey_id can have different answers
  constructor(survey_id:u32,public answer: string) {
    this.survey_id=survey_id;
    this.answerer=context.sender;
    
  }
}
