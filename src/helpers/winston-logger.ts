import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';
import { LogTypes } from './constants';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            const { logType, logMessage, method, requestId, requestUrl, requestBody, responseId, responseBody } = JSON.parse(message);

            switch (logType) {
                case LogTypes.REQUEST:
                    return `\n*************************    ${logMessage}  *************************\n
            Timestamp: ${timestamp}\n[${level.toUpperCase()}] - Method: ${method}\nRequest ID: ${requestId}\nRequest URL: ${requestUrl}\nRequest Body: ${JSON.stringify(requestBody)}`;

                default:
                    return `\n*************************    ${logMessage}  *************************\n
                Timestamp: ${timestamp}\nResponse ID: ${responseId}\nResponse Body: ${JSON.stringify(responseBody)}`;
            }
        })
    ),
    transports: [new winston.transports.Console()],
});

export const logRequest = (method: string, requestUrl: string, requestBody: object = null, logType = LogTypes.REQUEST) => {
    logger.info(JSON.stringify({
        logType: logType,
        logMessage: "Sending request to an api",
        method: method,
        requestId: uuidv4(),
        requestUrl: requestUrl,
        requestBody: requestBody
    }));
}

export const logResponse = (responseBody: object, logType = LogTypes.RESPONSE) => {
    logger.info(JSON.stringify({
        logType: logType,
        logMessage: "Sending response from an api",
        responseId: uuidv4(),
        responseBody: responseBody
    }));
}