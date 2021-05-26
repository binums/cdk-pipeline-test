"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopPipelineStack = void 0;
const cdk = require("@aws-cdk/core");
const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipeline_actions = require("@aws-cdk/aws-codepipeline-actions");
const pipelines_1 = require("@aws-cdk/pipelines");
const core_1 = require("@aws-cdk/core");
const pipeline_satge_1 = require("./pipeline-satge");
class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id);
        const sourceArtifact = new codepipeline.Artifact();
        const cloudAssemblyArtifact = new codepipeline.Artifact();
        const pipeline = new pipelines_1.CdkPipeline(this, "Pipeline", {
            pipelineName: "WorkshopPipeline",
            cloudAssemblyArtifact,
            sourceAction: new codepipeline_actions.GitHubSourceAction({
                actionName: "GitHub",
                output: sourceArtifact,
                oauthToken: core_1.SecretValue.secretsManager("CDK-Pipeline-test-github-token"),
                branch: "main",
                owner: "binums",
                repo: "cdk-pipeline-test"
            }),
            synthAction: pipelines_1.SimpleSynthAction.standardNpmSynth({
                sourceArtifact,
                cloudAssemblyArtifact,
                buildCommand: "npm run build"
            })
        });
        const deploy = new pipeline_satge_1.WorkshopPipelineStage(this, "Deploy");
        pipeline.addApplicationStage(deploy);
    }
}
exports.WorkshopPipelineStack = WorkshopPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsMERBQTBEO0FBQzFELDBFQUEwRTtBQUMxRSxrREFBb0U7QUFDcEUsd0NBQTRDO0FBQzVDLHFEQUF5RDtBQUV6RCxNQUFhLHFCQUFzQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ25ELFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDbkUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLGNBQWMsR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuRCxNQUFNLHFCQUFxQixHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTFELE1BQU0sUUFBUSxHQUFHLElBQUksdUJBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2xELFlBQVksRUFBRSxrQkFBa0I7WUFDaEMscUJBQXFCO1lBRXJCLFlBQVksRUFBRSxJQUFJLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDO2dCQUN6RCxVQUFVLEVBQUUsUUFBUTtnQkFDcEIsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLFVBQVUsRUFBRSxrQkFBVyxDQUFDLGNBQWMsQ0FDckMsZ0NBQWdDLENBQ2hDO2dCQUNELE1BQU0sRUFBRSxNQUFNO2dCQUNkLEtBQUssRUFBRSxRQUFRO2dCQUNmLElBQUksRUFBRSxtQkFBbUI7YUFDekIsQ0FBQztZQUVGLFdBQVcsRUFBRSw2QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDL0MsY0FBYztnQkFDZCxxQkFBcUI7Z0JBQ3JCLFlBQVksRUFBRSxlQUFlO2FBQzdCLENBQUM7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRyxJQUFJLHNDQUFxQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV6RCxRQUFRLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNEO0FBakNELHNEQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0ICogYXMgY29kZXBpcGVsaW5lIGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lXCI7XG5pbXBvcnQgKiBhcyBjb2RlcGlwZWxpbmVfYWN0aW9ucyBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zXCI7XG5pbXBvcnQgeyBDZGtQaXBlbGluZSwgU2ltcGxlU3ludGhBY3Rpb24gfSBmcm9tIFwiQGF3cy1jZGsvcGlwZWxpbmVzXCI7XG5pbXBvcnQgeyBTZWNyZXRWYWx1ZSB9IGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgeyBXb3Jrc2hvcFBpcGVsaW5lU3RhZ2UgfSBmcm9tIFwiLi9waXBlbGluZS1zYXRnZVwiO1xuXG5leHBvcnQgY2xhc3MgV29ya3Nob3BQaXBlbGluZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcblx0Y29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcblx0XHRzdXBlcihzY29wZSwgaWQpO1xuXG5cdFx0Y29uc3Qgc291cmNlQXJ0aWZhY3QgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCk7XG5cdFx0Y29uc3QgY2xvdWRBc3NlbWJseUFydGlmYWN0ID0gbmV3IGNvZGVwaXBlbGluZS5BcnRpZmFjdCgpO1xuXG5cdFx0Y29uc3QgcGlwZWxpbmUgPSBuZXcgQ2RrUGlwZWxpbmUodGhpcywgXCJQaXBlbGluZVwiLCB7XG5cdFx0XHRwaXBlbGluZU5hbWU6IFwiV29ya3Nob3BQaXBlbGluZVwiLFxuXHRcdFx0Y2xvdWRBc3NlbWJseUFydGlmYWN0LFxuXG5cdFx0XHRzb3VyY2VBY3Rpb246IG5ldyBjb2RlcGlwZWxpbmVfYWN0aW9ucy5HaXRIdWJTb3VyY2VBY3Rpb24oe1xuXHRcdFx0XHRhY3Rpb25OYW1lOiBcIkdpdEh1YlwiLFxuXHRcdFx0XHRvdXRwdXQ6IHNvdXJjZUFydGlmYWN0LFxuXHRcdFx0XHRvYXV0aFRva2VuOiBTZWNyZXRWYWx1ZS5zZWNyZXRzTWFuYWdlcihcblx0XHRcdFx0XHRcIkNESy1QaXBlbGluZS10ZXN0LWdpdGh1Yi10b2tlblwiXG5cdFx0XHRcdCksXG5cdFx0XHRcdGJyYW5jaDogXCJtYWluXCIsXG5cdFx0XHRcdG93bmVyOiBcImJpbnVtc1wiLFxuXHRcdFx0XHRyZXBvOiBcImNkay1waXBlbGluZS10ZXN0XCJcblx0XHRcdH0pLFxuXG5cdFx0XHRzeW50aEFjdGlvbjogU2ltcGxlU3ludGhBY3Rpb24uc3RhbmRhcmROcG1TeW50aCh7XG5cdFx0XHRcdHNvdXJjZUFydGlmYWN0LFxuXHRcdFx0XHRjbG91ZEFzc2VtYmx5QXJ0aWZhY3QsXG5cdFx0XHRcdGJ1aWxkQ29tbWFuZDogXCJucG0gcnVuIGJ1aWxkXCJcblx0XHRcdH0pXG5cdFx0fSk7XG5cblx0XHRjb25zdCBkZXBsb3kgPSBuZXcgV29ya3Nob3BQaXBlbGluZVN0YWdlKHRoaXMsIFwiRGVwbG95XCIpO1xuXG5cdFx0cGlwZWxpbmUuYWRkQXBwbGljYXRpb25TdGFnZShkZXBsb3kpO1xuXHR9XG59XG4iXX0=