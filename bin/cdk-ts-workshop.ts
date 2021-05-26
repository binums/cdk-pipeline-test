#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { WorkshopPipelineStack } from "../lib/pipeline-stack";

const app = new cdk.App();
const stageName = app.node.tryGetContext("stageName") || "dev";

new WorkshopPipelineStack(app, "CdkTsWorkshopPipelineStack", {
	stackName: `CdkTsWorkshopPipelineStack-${stageName}`
});
