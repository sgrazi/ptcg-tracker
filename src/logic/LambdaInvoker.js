import { showError } from "./ErrorShower";
import { parseJSON } from "./JSONParser";
import AWS from 'aws-sdk';

export async function invokeLambda (lambdaName) {
    const lambda = new AWS.Lambda();
    const params = {
        FunctionName: lambdaName,
        Payload: JSON.stringify({})
    };

    try {
        const response = await lambda.invoke(params).promise();
        return response;
    } catch (error) {
        showError(error);
    }
  };

export async function invokeLambdaWBody (lambdaName, body) {
    const lambda = new AWS.Lambda();
    const params = {
        FunctionName: lambdaName,
        Payload: JSON.stringify(body)
    };

    try {
        const response = await lambda.invoke(params).promise();
        if (response && response.StatusCode === 200){
            return parseJSON(response.Payload);
        }
    } catch (error) {
        showError(error);
    }
  };