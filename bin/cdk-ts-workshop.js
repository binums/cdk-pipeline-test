#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const pipeline_stack_1 = require("../lib/pipeline-stack");
const app = new cdk.App();
const stageName = app.node.tryGetContext("stageName") || "dev";
new pipeline_stack_1.WorkshopPipelineStack(app, `CdkTsWorkshopPipelineStack-${stageName}`, {
    stackName: `CdkTsWorkshopPipelineStack-${stageName}`
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXRzLXdvcmtzaG9wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXRzLXdvcmtzaG9wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFDQUFxQztBQUNyQywwREFBOEQ7QUFFOUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxDQUFDO0FBRS9ELElBQUksc0NBQXFCLENBQUMsR0FBRyxFQUFFLDhCQUE4QixTQUFTLEVBQUUsRUFBRTtJQUN6RSxTQUFTLEVBQUUsOEJBQThCLFNBQVMsRUFBRTtDQUNwRCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7IFdvcmtzaG9wUGlwZWxpbmVTdGFjayB9IGZyb20gXCIuLi9saWIvcGlwZWxpbmUtc3RhY2tcIjtcblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbmNvbnN0IHN0YWdlTmFtZSA9IGFwcC5ub2RlLnRyeUdldENvbnRleHQoXCJzdGFnZU5hbWVcIikgfHwgXCJkZXZcIjtcblxubmV3IFdvcmtzaG9wUGlwZWxpbmVTdGFjayhhcHAsIGBDZGtUc1dvcmtzaG9wUGlwZWxpbmVTdGFjay0ke3N0YWdlTmFtZX1gLCB7XG5cdHN0YWNrTmFtZTogYENka1RzV29ya3Nob3BQaXBlbGluZVN0YWNrLSR7c3RhZ2VOYW1lfWBcbn0pO1xuIl19