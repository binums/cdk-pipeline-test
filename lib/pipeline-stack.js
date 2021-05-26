"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopPipelineStack = void 0;
const cdk = require("@aws-cdk/core");
const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipeline_actions = require("@aws-cdk/aws-codepipeline-actions");
const pipelines_1 = require("@aws-cdk/pipelines");
const core_1 = require("@aws-cdk/core");
class WorkshopPipelineStack extends cdk.Construct {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsMERBQTBEO0FBQzFELDBFQUEwRTtBQUMxRSxrREFBb0U7QUFDcEUsd0NBQTRDO0FBSTVDLE1BQWEscUJBQXNCLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFDdkQsWUFDQyxLQUFvQixFQUNwQixFQUFVLEVBQ1YsS0FBa0M7UUFFbEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLGNBQWMsR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuRCxNQUFNLHFCQUFxQixHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTFELElBQUksdUJBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ2pDLFlBQVksRUFBRSxrQkFBa0I7WUFDaEMscUJBQXFCO1lBRXJCLFlBQVksRUFBRSxJQUFJLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDO2dCQUN6RCxVQUFVLEVBQUUsUUFBUTtnQkFDcEIsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLFVBQVUsRUFBRSxrQkFBVyxDQUFDLGNBQWMsQ0FDckMsZ0NBQWdDLENBQ2hDO2dCQUNELE1BQU0sRUFBRSxNQUFNO2dCQUNkLEtBQUssRUFBRSxRQUFRO2dCQUNmLElBQUksRUFBRSxtQkFBbUI7YUFDekIsQ0FBQztZQUVDLFdBQVcsRUFBRSw2QkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDOUMsY0FBYztnQkFDZCxxQkFBcUI7Z0JBQ3JCLFlBQVksRUFBRSxlQUFlO2FBQzlCLENBQUM7U0FDTCxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0Q7QUFqQ0Qsc0RBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gXCJAYXdzLWNkay9jb3JlXCI7XG5pbXBvcnQgKiBhcyBjb2RlcGlwZWxpbmUgZnJvbSBcIkBhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmVcIjtcbmltcG9ydCAqIGFzIGNvZGVwaXBlbGluZV9hY3Rpb25zIGZyb20gXCJAYXdzLWNkay9hd3MtY29kZXBpcGVsaW5lLWFjdGlvbnNcIjtcbmltcG9ydCB7IENka1BpcGVsaW5lLCBTaW1wbGVTeW50aEFjdGlvbiB9IGZyb20gXCJAYXdzLWNkay9waXBlbGluZXNcIjtcbmltcG9ydCB7IFNlY3JldFZhbHVlIH0gZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBXb3Jrc2hvcFBpcGVsaW5lU3RhY2tQcm9wcyB7fVxuXG5leHBvcnQgY2xhc3MgV29ya3Nob3BQaXBlbGluZVN0YWNrIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG5cdGNvbnN0cnVjdG9yKFxuXHRcdHNjb3BlOiBjZGsuQ29uc3RydWN0LFxuXHRcdGlkOiBzdHJpbmcsXG5cdFx0cHJvcHM/OiBXb3Jrc2hvcFBpcGVsaW5lU3RhY2tQcm9wc1xuXHQpIHtcblx0XHRzdXBlcihzY29wZSwgaWQpO1xuXG5cdFx0Y29uc3Qgc291cmNlQXJ0aWZhY3QgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCk7XG5cdFx0Y29uc3QgY2xvdWRBc3NlbWJseUFydGlmYWN0ID0gbmV3IGNvZGVwaXBlbGluZS5BcnRpZmFjdCgpO1xuXG5cdFx0bmV3IENka1BpcGVsaW5lKHRoaXMsIFwiUGlwZWxpbmVcIiwge1xuXHRcdFx0cGlwZWxpbmVOYW1lOiBcIldvcmtzaG9wUGlwZWxpbmVcIixcblx0XHRcdGNsb3VkQXNzZW1ibHlBcnRpZmFjdCxcblxuXHRcdFx0c291cmNlQWN0aW9uOiBuZXcgY29kZXBpcGVsaW5lX2FjdGlvbnMuR2l0SHViU291cmNlQWN0aW9uKHtcblx0XHRcdFx0YWN0aW9uTmFtZTogXCJHaXRIdWJcIixcblx0XHRcdFx0b3V0cHV0OiBzb3VyY2VBcnRpZmFjdCxcblx0XHRcdFx0b2F1dGhUb2tlbjogU2VjcmV0VmFsdWUuc2VjcmV0c01hbmFnZXIoXG5cdFx0XHRcdFx0XCJDREstUGlwZWxpbmUtdGVzdC1naXRodWItdG9rZW5cIlxuXHRcdFx0XHQpLFxuXHRcdFx0XHRicmFuY2g6IFwibWFpblwiLFxuXHRcdFx0XHRvd25lcjogXCJiaW51bXNcIixcblx0XHRcdFx0cmVwbzogXCJjZGstcGlwZWxpbmUtdGVzdFwiXG5cdFx0XHR9KSxcblxuICAgICAgc3ludGhBY3Rpb246IFNpbXBsZVN5bnRoQWN0aW9uLnN0YW5kYXJkTnBtU3ludGgoe1xuICAgICAgICBzb3VyY2VBcnRpZmFjdCxcbiAgICAgICAgY2xvdWRBc3NlbWJseUFydGlmYWN0LFxuICAgICAgICBidWlsZENvbW1hbmQ6IFwibnBtIHJ1biBidWlsZFwiXG4gICAgICB9KVxuXHRcdH0pO1xuXHR9XG59XG4iXX0=