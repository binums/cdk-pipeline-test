import * as cdk from "@aws-cdk/core";
import { CdkTsWorkshopStack } from "./cdk-ts-workshop-stack";

export class WorkshopPipelineStage extends cdk.Stage {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
		super(scope, id, props);

    new CdkTsWorkshopStack(this, 'WebService')
	}
}
