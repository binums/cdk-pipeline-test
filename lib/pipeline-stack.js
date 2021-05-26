"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopPipelineStack = void 0;
const cdk = require("@aws-cdk/core");
const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipeline_actions = require("@aws-cdk/aws-codepipeline-actions");
const pipelines_1 = require("@aws-cdk/pipelines");
const core_1 = require("@aws-cdk/core");
class WorkshopPipelineStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id);
        const sourceArtifact = new codepipeline.Artifact();
        const cloudAssemblyArtifact = new codepipeline.Artifact();
        new pipelines_1.CdkPipeline(this, "Pipeline", {
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
    }
}
exports.WorkshopPipelineStack = WorkshopPipelineStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsMERBQTBEO0FBQzFELDBFQUEwRTtBQUMxRSxrREFBb0U7QUFDcEUsd0NBQTRDO0FBRTVDLE1BQWEscUJBQXNCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDbkQsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNuRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sY0FBYyxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25ELE1BQU0scUJBQXFCLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFMUQsSUFBSSx1QkFBVyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUU7WUFDakMsWUFBWSxFQUFFLGtCQUFrQjtZQUNoQyxxQkFBcUI7WUFFckIsWUFBWSxFQUFFLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3pELFVBQVUsRUFBRSxRQUFRO2dCQUNwQixNQUFNLEVBQUUsY0FBYztnQkFDdEIsVUFBVSxFQUFFLGtCQUFXLENBQUMsY0FBYyxDQUNyQyxnQ0FBZ0MsQ0FDaEM7Z0JBQ0QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsSUFBSSxFQUFFLG1CQUFtQjthQUN6QixDQUFDO1lBRUYsV0FBVyxFQUFFLDZCQUFpQixDQUFDLGdCQUFnQixDQUFDO2dCQUMvQyxjQUFjO2dCQUNkLHFCQUFxQjtnQkFDckIsWUFBWSxFQUFFLGVBQWU7YUFDN0IsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRDtBQTdCRCxzREE2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCAqIGFzIGNvZGVwaXBlbGluZSBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZVwiO1xuaW1wb3J0ICogYXMgY29kZXBpcGVsaW5lX2FjdGlvbnMgZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUtYWN0aW9uc1wiO1xuaW1wb3J0IHsgQ2RrUGlwZWxpbmUsIFNpbXBsZVN5bnRoQWN0aW9uIH0gZnJvbSBcIkBhd3MtY2RrL3BpcGVsaW5lc1wiO1xuaW1wb3J0IHsgU2VjcmV0VmFsdWUgfSBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuXG5leHBvcnQgY2xhc3MgV29ya3Nob3BQaXBlbGluZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcblx0Y29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcblx0XHRzdXBlcihzY29wZSwgaWQpO1xuXG5cdFx0Y29uc3Qgc291cmNlQXJ0aWZhY3QgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCk7XG5cdFx0Y29uc3QgY2xvdWRBc3NlbWJseUFydGlmYWN0ID0gbmV3IGNvZGVwaXBlbGluZS5BcnRpZmFjdCgpO1xuXG5cdFx0bmV3IENka1BpcGVsaW5lKHRoaXMsIFwiUGlwZWxpbmVcIiwge1xuXHRcdFx0cGlwZWxpbmVOYW1lOiBcIldvcmtzaG9wUGlwZWxpbmVcIixcblx0XHRcdGNsb3VkQXNzZW1ibHlBcnRpZmFjdCxcblxuXHRcdFx0c291cmNlQWN0aW9uOiBuZXcgY29kZXBpcGVsaW5lX2FjdGlvbnMuR2l0SHViU291cmNlQWN0aW9uKHtcblx0XHRcdFx0YWN0aW9uTmFtZTogXCJHaXRIdWJcIixcblx0XHRcdFx0b3V0cHV0OiBzb3VyY2VBcnRpZmFjdCxcblx0XHRcdFx0b2F1dGhUb2tlbjogU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoXG5cdFx0XHRcdFx0XCJDREstUGlwZWxpbmUtdGVzdC1naXRodWItdG9rZW5cIlxuXHRcdFx0XHQpLFxuXHRcdFx0XHRicmFuY2g6IFwibWFpblwiLFxuXHRcdFx0XHRvd25lcjogXCJiaW51bXNcIixcblx0XHRcdFx0cmVwbzogXCJjZGstcGlwZWxpbmUtdGVzdFwiXG5cdFx0XHR9KSxcblxuXHRcdFx0c3ludGhBY3Rpb246IFNpbXBsZVN5bnRoQWN0aW9uLnN0YW5kYXJkTnBtU3ludGgoe1xuXHRcdFx0XHRzb3VyY2VBcnRpZmFjdCxcblx0XHRcdFx0Y2xvdWRBc3NlbWJseUFydGlmYWN0LFxuXHRcdFx0XHRidWlsZENvbW1hbmQ6IFwibnBtIHJ1biBidWlsZFwiXG5cdFx0XHR9KVxuXHRcdH0pO1xuXHR9XG59XG4iXX0=