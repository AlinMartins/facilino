// Do not edit this file; automatically generated by build.py.
"use strict";


// Copyright 2012 Google Inc.  Apache License 2.0

Blockly.Blocks.procedures_defnoreturn={init:function(){this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL),this.setColour(290);var t=Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE,this);this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE).appendField(new Blockly.FieldTextInput(t,Blockly.Procedures.rename),"NAME").appendField("","PARAMS"),this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"])),this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP),this.arguments_=[],this.setStatements_(!0),this.statementConnection_=null},setStatements_:function(t){this.hasStatements_!==t&&(t?(this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO),this.getInput("RETURN")&&this.moveInputBefore("STACK","RETURN")):this.removeInput("STACK",!0),this.hasStatements_=t)},updateParams_:function(){for(var t=!1,e={},o=0;o<this.arguments_.length;o++){if(e["arg_"+this.arguments_[o].toLowerCase()]){t=!0;break}e["arg_"+this.arguments_[o].toLowerCase()]=!0}t?this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING):this.setWarningText(null),t="",this.arguments_.length&&(t=Blockly.Msg.PROCEDURES_BEFORE_PARAMS+" "+this.arguments_.join(", ")),this.setFieldValue(t,"PARAMS")},mutationToDom:function(){for(var t=document.createElement("mutation"),e=0;e<this.arguments_.length;e++){var o=document.createElement("arg");o.setAttribute("name",this.arguments_[e]),t.appendChild(o)}return this.hasStatements_||t.setAttribute("statements","false"),t},domToMutation:function(t){this.arguments_=[];for(var e,o=0;e=t.childNodes[o];o++)"arg"==e.nodeName.toLowerCase()&&this.arguments_.push(e.getAttribute("name"));this.updateParams_(),this.setStatements_("false"!==t.getAttribute("statements"))},decompose:function(t){var e=Blockly.Block.obtain(t,"procedures_mutatorcontainer");e.initSvg(),this.getInput("RETURN")?e.setFieldValue(this.hasStatements_?"TRUE":"FALSE","STATEMENTS"):e.getInput("STATEMENT_INPUT").setVisible(!1);for(var o=e.getInput("STACK").connection,n=0;n<this.arguments_.length;n++){var l=Blockly.Block.obtain(t,"procedures_mutatorarg");l.initSvg(),l.setFieldValue(this.arguments_[n],"NAME"),l.oldLocation=n,o.connect(l.previousConnection),o=l.nextConnection}return Blockly.Procedures.mutateCallers(this.getFieldValue("NAME"),this.workspace,this.arguments_,null),e},compose:function(t){this.arguments_=[],this.paramIds_=[];for(var e=t.getInputTargetBlock("STACK");e;)this.arguments_.push(e.getFieldValue("NAME")),this.paramIds_.push(e.id),e=e.nextConnection&&e.nextConnection.targetBlock();this.updateParams_(),Blockly.Procedures.mutateCallers(this.getFieldValue("NAME"),this.workspace,this.arguments_,this.paramIds_),null!==(t=t.getFieldValue("STATEMENTS"))&&(t="TRUE"==t,this.hasStatements_!=t)&&(t?(this.setStatements_(!0),t=this.getInput("STACK").connection,t.targetConnection||!this.statementConnection_||this.statementConnection_.targetConnection||this.statementConnection_.sourceBlock_.workspace!=this.workspace?this.statementConnection_=null:t.connect(this.statementConnection_)):(t=this.getInput("STACK").connection,(this.statementConnection_=t.targetConnection)&&((t=t.targetBlock()).setParent(null),t.bumpNeighbours_()),this.setStatements_(!1)))},dispose:function(){var t=this.getFieldValue("NAME");Blockly.Procedures.disposeCallers(t,this.workspace),Blockly.Block.prototype.dispose.apply(this,arguments)},getProcedureDef:function(){return[this.getFieldValue("NAME"),this.arguments_,!1]},getVars:function(){return this.arguments_},renameVar:function(t,e){for(var o=!1,n=0;n<this.arguments_.length;n++)Blockly.Names.equals(t,this.arguments_[n])&&(this.arguments_[n]=e,o=!0);if(o&&(this.updateParams_(),this.mutator.isVisible_()))for(var l,o=this.mutator.workspace_.getAllBlocks(),n=0;l=o[n];n++)"procedures_mutatorarg"==l.type&&Blockly.Names.equals(t,l.getFieldValue("NAME"))&&l.setFieldValue(e,"NAME")},customContextMenu:function(t){var e={enabled:!0},o=this.getFieldValue("NAME");e.text=Blockly.Msg.PROCEDURES_CREATE_DO.replace("%1",o);var n=goog.dom.createDom("mutation");n.setAttribute("name",o);for(var l=0;l<this.arguments_.length;l++)(o=goog.dom.createDom("arg")).setAttribute("name",this.arguments_[l]),n.appendChild(o);if((n=goog.dom.createDom("block",null,n)).setAttribute("type",this.callType_),e.callback=Blockly.ContextMenu.callbackFactory(this,n),t.push(e),!this.isCollapsed())for(l=0;l<this.arguments_.length;l++)e={enabled:!0},o=this.arguments_[l],e.text=Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1",o),(n=goog.dom.createDom("field",null,o)).setAttribute("name","VAR"),(n=goog.dom.createDom("block",null,n)).setAttribute("type","variables_get"),e.callback=Blockly.ContextMenu.callbackFactory(this,n),t.push(e)},callType_:"procedures_callnoreturn"},Blockly.Blocks.procedures_defreturn={init:function(){this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL),this.setColour(290);var t=Blockly.Procedures.findLegalName(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE,this);this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE).appendField(new Blockly.FieldTextInput(t,Blockly.Procedures.rename),"NAME").appendField("","PARAMS"),this.appendValueInput("RETURN").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN),this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"])),this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP),this.arguments_=[],this.setStatements_(!0),this.statementConnection_=null},setStatements_:Blockly.Blocks.procedures_defnoreturn.setStatements_,updateParams_:Blockly.Blocks.procedures_defnoreturn.updateParams_,mutationToDom:Blockly.Blocks.procedures_defnoreturn.mutationToDom,domToMutation:Blockly.Blocks.procedures_defnoreturn.domToMutation,decompose:Blockly.Blocks.procedures_defnoreturn.decompose,compose:Blockly.Blocks.procedures_defnoreturn.compose,dispose:Blockly.Blocks.procedures_defnoreturn.dispose,getProcedureDef:function(){return[this.getFieldValue("NAME"),this.arguments_,!0]},getVars:Blockly.Blocks.procedures_defnoreturn.getVars,renameVar:Blockly.Blocks.procedures_defnoreturn.renameVar,customContextMenu:Blockly.Blocks.procedures_defnoreturn.customContextMenu,callType_:"procedures_callreturn"},Blockly.Blocks.procedures_mutatorcontainer={init:function(){this.setColour(290),this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE),this.appendStatementInput("STACK"),this.appendDummyInput("STATEMENT_INPUT").appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS).appendField(new Blockly.FieldCheckbox("TRUE"),"STATEMENTS"),this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP),this.contextMenu=!1}},Blockly.Blocks.procedures_mutatorarg={init:function(){this.setColour(290),this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE).appendField(new Blockly.FieldTextInput("x",this.validator_),"NAME"),this.setPreviousStatement(!0),this.setNextStatement(!0),this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP),this.contextMenu=!1},validator_:function(t){return(t=t.replace(/[\s\xa0]+/g," ").replace(/^ | $/g,""))||null}},Blockly.Blocks.procedures_callnoreturn={init:function(){this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL),this.setColour(290),this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALLNORETURN_CALL).appendField("","NAME").appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS,"WITH"),this.setPreviousStatement(!0),this.setNextStatement(!0),this.arguments_=[],this.quarkArguments_=this.quarkConnections_=null},getProcedureCall:function(){return this.getFieldValue("NAME")},renameProcedure:function(t,e){Blockly.Names.equals(t,this.getProcedureCall())&&(this.setFieldValue(e,"NAME"),this.setTooltip((this.outputConnection?Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP:Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace("%1",e)))},setProcedureParameters:function(t,e){if(e){if(e.length!=t.length)throw"Error: paramNames and paramIds must be the same length.";this.quarkArguments_||(this.quarkConnections_={},t.join("\n")==this.arguments_.join("\n")?this.quarkArguments_=e:this.quarkArguments_=[]);var o=this.rendered;this.rendered=!1;for(var n=this.arguments_.length-1;0<=n;n--){var l=this.getInput("ARG"+n);if(l){var s=l.connection.targetConnection;this.quarkConnections_[this.quarkArguments_[n]]=s,this.removeInput("ARG"+n)}}for(this.arguments_=[].concat(t),this.quarkArguments_=e,n=0;n<this.arguments_.length;n++)if(l=this.appendValueInput("ARG"+n).setAlign(Blockly.ALIGN_RIGHT).appendField(this.arguments_[n]),this.quarkArguments_){var i=this.quarkArguments_[n];i in this.quarkConnections_&&(s=this.quarkConnections_[i],!s||s.targetConnection||s.sourceBlock_.workspace!=this.workspace?delete this.quarkConnections_[i]:l.connection.connect(s))}this.getField_("WITH").setVisible(!!this.arguments_.length),(this.rendered=o)&&this.render()}else this.quarkConnections_={},this.quarkArguments_=null},mutationToDom:function(){var t=document.createElement("mutation");t.setAttribute("name",this.getProcedureCall());for(var e=0;e<this.arguments_.length;e++){var o=document.createElement("arg");o.setAttribute("name",this.arguments_[e]),t.appendChild(o)}return t},domToMutation:function(t){o=t.getAttribute("name");if(this.setFieldValue(o,"NAME"),this.setTooltip((this.outputConnection?Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP:Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace("%1",o)),(o=Blockly.Procedures.getDefinition(o,this.workspace))&&o.mutator.isVisible())this.setProcedureParameters(o.arguments_,o.paramIds_);else{this.arguments_=[];for(var e,o=0;e=t.childNodes[o];o++)"arg"==e.nodeName.toLowerCase()&&this.arguments_.push(e.getAttribute("name"));this.setProcedureParameters(this.arguments_,this.arguments_)}},renameVar:function(t,e){for(var o=0;o<this.arguments_.length;o++)Blockly.Names.equals(t,this.arguments_[o])&&(this.arguments_[o]=e,this.getInput("ARG"+o).fieldRow[0].setText(e))},customContextMenu:function(t){var e={enabled:!0};e.text=Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;var o=this.getProcedureCall(),n=this.workspace;e.callback=function(){var t=Blockly.Procedures.getDefinition(o,n);t&&t.select()},t.push(e)}},Blockly.Blocks.procedures_callreturn={init:function(){this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL),this.setColour(290),this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALLRETURN_CALL).appendField("","NAME").appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS,"WITH"),this.setOutput(!0),this.arguments_=[],this.quarkArguments_=this.quarkConnections_=null},getProcedureCall:Blockly.Blocks.procedures_callnoreturn.getProcedureCall,renameProcedure:Blockly.Blocks.procedures_callnoreturn.renameProcedure,setProcedureParameters:Blockly.Blocks.procedures_callnoreturn.setProcedureParameters,mutationToDom:Blockly.Blocks.procedures_callnoreturn.mutationToDom,domToMutation:Blockly.Blocks.procedures_callnoreturn.domToMutation,renameVar:Blockly.Blocks.procedures_callnoreturn.renameVar,customContextMenu:Blockly.Blocks.procedures_callnoreturn.customContextMenu},Blockly.Blocks.procedures_ifreturn={init:function(){this.setHelpUrl("http://c2.com/cgi/wiki?GuardClause"),this.setColour(290),this.appendValueInput("CONDITION").setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_IF),this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN),this.setInputsInline(!0),this.setPreviousStatement(!0),this.setNextStatement(!0),this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP),this.hasReturnValue_=!0},mutationToDom:function(){var t=document.createElement("mutation");return t.setAttribute("value",+this.hasReturnValue_),t},domToMutation:function(t){this.hasReturnValue_=1==t.getAttribute("value"),this.hasReturnValue_||(this.removeInput("VALUE"),this.appendDummyInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN))},onchange:function(){if(this.workspace){var t=!1,e=this;do{if("procedures_defnoreturn"==e.type||"procedures_defreturn"==e.type){t=!0;break}e=e.getSurroundParent()}while(e);t?("procedures_defnoreturn"==e.type&&this.hasReturnValue_?(this.removeInput("VALUE"),this.appendDummyInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN),this.hasReturnValue_=!1):"procedures_defreturn"!=e.type||this.hasReturnValue_||(this.removeInput("VALUE"),this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN),this.hasReturnValue_=!0),this.setWarningText(null)):this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING)}}},Blockly.Blocks.controls_whileUntil={init:function(){var t=[[Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE,"WHILE"],[Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL,"UNTIL"]];this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL),this.setColour(120),this.appendValueInput("BOOL").setCheck("Boolean").appendField(new Blockly.FieldDropdown(t),"MODE"),this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO),this.setPreviousStatement(!0),this.setNextStatement(!0);var e=this;this.setTooltip(function(){var t=e.getFieldValue("MODE");return{WHILE:Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,UNTIL:Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL}[t]})}},Blockly.Blocks.controls_for={init:function(){this.setHelpUrl(Blockly.Msg.CONTROLS_FOR_HELPURL),this.setColour(120),this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_FOR_INPUT_WITH).appendField(new Blockly.FieldVariable(null),"VAR"),this.interpolateMsg(Blockly.Msg.CONTROLS_FOR_INPUT_FROM_TO_BY,["FROM","Number",Blockly.ALIGN_RIGHT],["TO","Number",Blockly.ALIGN_RIGHT],["BY","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT),this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_FOR_INPUT_DO),this.setPreviousStatement(!0),this.setNextStatement(!0),this.setInputsInline(!0);var t=this;this.setTooltip(function(){return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace("%1",t.getFieldValue("VAR"))})},getVars:function(){return[this.getFieldValue("VAR")]},renameVar:function(t,e){Blockly.Names.equals(t,this.getFieldValue("VAR"))&&this.setFieldValue(e,"VAR")},customContextMenu:function(t){if(!this.isCollapsed()){var e={enabled:!0},o=this.getFieldValue("VAR");e.text=Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1",o),(o=goog.dom.createDom("field",null,o)).setAttribute("name","VAR"),(o=goog.dom.createDom("block",null,o)).setAttribute("type","variables_get"),e.callback=Blockly.ContextMenu.callbackFactory(this,o),t.push(e)}}},Blockly.Blocks.controls_flow_statements={init:function(){var t=[[Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK,"BREAK"],[Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE,"CONTINUE"]];this.setHelpUrl(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_HELPURL),this.setColour(120),this.appendDummyInput().appendField(new Blockly.FieldDropdown(t),"FLOW"),this.setPreviousStatement(!0);var e=this;this.setTooltip(function(){var t=e.getFieldValue("FLOW");return{BREAK:Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,CONTINUE:Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE}[t]})},onchange:function(){if(this.workspace){var t=!1,e=this;do{if("controls_repeat"==e.type||"controls_repeat_ext"==e.type||"controls_forEach"==e.type||"controls_for"==e.type||"controls_whileUntil"==e.type){t=!0;break}e=e.getSurroundParent()}while(e);t?this.setWarningText(null):this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING)}}},Blockly.Blocks.controls_if={init:function(){this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL),this.setColour(210),this.appendValueInput("IF0").setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_IF),this.appendStatementInput("DO0").appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN),this.setPreviousStatement(!0),this.setNextStatement(!0),this.setMutator(new Blockly.Mutator(["controls_if_elseif","controls_if_else"]));var t=this;this.setTooltip(function(){return t.elseifCount_||t.elseCount_?!t.elseifCount_&&t.elseCount_?Blockly.Msg.CONTROLS_IF_TOOLTIP_2:t.elseifCount_&&!t.elseCount_?Blockly.Msg.CONTROLS_IF_TOOLTIP_3:t.elseifCount_&&t.elseCount_?Blockly.Msg.CONTROLS_IF_TOOLTIP_4:"":Blockly.Msg.CONTROLS_IF_TOOLTIP_1}),this.elseCount_=this.elseifCount_=0},mutationToDom:function(){if(!this.elseifCount_&&!this.elseCount_)return null;var t=document.createElement("mutation");return this.elseifCount_&&t.setAttribute("elseif",this.elseifCount_),this.elseCount_&&t.setAttribute("else",1),t},domToMutation:function(t){for(this.elseifCount_=parseInt(t.getAttribute("elseif"),10),this.elseCount_=parseInt(t.getAttribute("else"),10),t=1;t<=this.elseifCount_;t++)this.appendValueInput("IF"+t).setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF),this.appendStatementInput("DO"+t).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);this.elseCount_&&this.appendStatementInput("ELSE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)},decompose:function(t){var e=Blockly.Block.obtain(t,"controls_if_if");e.initSvg();for(var o=e.getInput("STACK").connection,n=1;n<=this.elseifCount_;n++){var l=Blockly.Block.obtain(t,"controls_if_elseif");l.initSvg(),o.connect(l.previousConnection),o=l.nextConnection}return this.elseCount_&&((t=Blockly.Block.obtain(t,"controls_if_else")).initSvg(),o.connect(t.previousConnection)),e},compose:function(t){this.elseCount_&&this.removeInput("ELSE"),this.elseCount_=0;for(e=this.elseifCount_;0<e;e--)this.removeInput("IF"+e),this.removeInput("DO"+e);for(this.elseifCount_=0,t=t.getInputTargetBlock("STACK");t;){switch(t.type){case"controls_if_elseif":this.elseifCount_++;var e=this.appendValueInput("IF"+this.elseifCount_).setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF),o=this.appendStatementInput("DO"+this.elseifCount_);o.appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN),t.valueConnection_&&e.connection.connect(t.valueConnection_),t.statementConnection_&&o.connection.connect(t.statementConnection_);break;case"controls_if_else":this.elseCount_++,(e=this.appendStatementInput("ELSE")).appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE),t.statementConnection_&&e.connection.connect(t.statementConnection_);break;default:throw"Unknown block type."}t=t.nextConnection&&t.nextConnection.targetBlock()}},saveConnections:function(t){t=t.getInputTargetBlock("STACK");for(var e=1;t;){switch(t.type){case"controls_if_elseif":var o=this.getInput("IF"+e),n=this.getInput("DO"+e);t.valueConnection_=o&&o.connection.targetConnection,t.statementConnection_=n&&n.connection.targetConnection,e++;break;case"controls_if_else":n=this.getInput("ELSE"),t.statementConnection_=n&&n.connection.targetConnection;break;default:throw"Unknown block type."}t=t.nextConnection&&t.nextConnection.targetBlock()}}},Blockly.Blocks.controls_if_if={init:function(){this.setColour(210),this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF),this.appendStatementInput("STACK"),this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP),this.contextMenu=!1}},Blockly.Blocks.controls_if_elseif={init:function(){this.setColour(210),this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF),this.setPreviousStatement(!0),this.setNextStatement(!0),this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP),this.contextMenu=!1}},Blockly.Blocks.controls_if_else={init:function(){this.setColour(210),this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE),this.setPreviousStatement(!0),this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP),this.contextMenu=!1}},Blockly.Blocks.logic_compare={init:function(){var t=Blockly.RTL?[["=","EQ"],["≠","NEQ"],[">","LT"],["≥","LTE"],["<","GT"],["≤","GTE"]]:[["=","EQ"],["≠","NEQ"],["<","LT"],["≤","LTE"],[">","GT"],["≥","GTE"]];this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL),this.setColour(210),this.setOutput(!0,"Boolean"),this.appendValueInput("A"),this.appendValueInput("B").appendField(new Blockly.FieldDropdown(t),"OP"),this.setInputsInline(!0);var e=this;this.setTooltip(function(){var t=e.getFieldValue("OP");return{EQ:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,NEQ:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,LT:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,LTE:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,GT:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,GTE:Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE}[t]})}},Blockly.Blocks.logic_operation={init:function(){var t=[[Blockly.Msg.LOGIC_OPERATION_AND,"AND"],[Blockly.Msg.LOGIC_OPERATION_OR,"OR"]];this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL),this.setColour(210),this.setOutput(!0,"Boolean"),this.appendValueInput("A").setCheck("Boolean"),this.appendValueInput("B").setCheck("Boolean").appendField(new Blockly.FieldDropdown(t),"OP"),this.setInputsInline(!0);var e=this;this.setTooltip(function(){var t=e.getFieldValue("OP");return{AND:Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,OR:Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR}[t]})}},Blockly.Blocks.logic_negate={init:function(){this.setHelpUrl(Blockly.Msg.LOGIC_NEGATE_HELPURL),this.setColour(210),this.setOutput(!0,"Boolean"),this.interpolateMsg(Blockly.Msg.LOGIC_NEGATE_TITLE,["BOOL","Boolean",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT),this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP)}},Blockly.Blocks.logic_boolean={init:function(){var t=[[Blockly.Msg.LOGIC_BOOLEAN_TRUE,"TRUE"],[Blockly.Msg.LOGIC_BOOLEAN_FALSE,"FALSE"]];this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL),this.setColour(210),this.setOutput(!0,"Boolean"),this.appendDummyInput().appendField(new Blockly.FieldDropdown(t),"BOOL"),this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP)}},Blockly.Blocks.math_number={init:function(){this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL),this.setColour(230),this.appendDummyInput().appendField(new Blockly.FieldTextInput("0",Blockly.FieldTextInput.numberValidator),"NUM"),this.setOutput(!0,"Number"),this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP)}},Blockly.Blocks.math_arithmetic={init:function(){var t=[[Blockly.Msg.MATH_ADDITION_SYMBOL,"ADD"],[Blockly.Msg.MATH_SUBTRACTION_SYMBOL,"MINUS"],[Blockly.Msg.MATH_MULTIPLICATION_SYMBOL,"MULTIPLY"],[Blockly.Msg.MATH_DIVISION_SYMBOL,"DIVIDE"],[Blockly.Msg.MATH_POWER_SYMBOL,"POWER"]];this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL),this.setColour(230),this.setOutput(!0,"Number"),this.appendValueInput("A").setCheck("Number"),this.appendValueInput("B").setCheck("Number").appendField(new Blockly.FieldDropdown(t),"OP"),this.setInputsInline(!0);var e=this;this.setTooltip(function(){var t=e.getFieldValue("OP");return{ADD:Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,MINUS:Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,MULTIPLY:Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,DIVIDE:Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,POWER:Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER}[t]})}},Blockly.Blocks.math_single={init:function(){var t=[[Blockly.Msg.MATH_SINGLE_OP_ROOT,"ROOT"],[Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE,"ABS"],["-","NEG"],["ln","LN"],["log10","LOG10"],["e^","EXP"],["10^","POW10"]];this.setHelpUrl(Blockly.Msg.MATH_SINGLE_HELPURL),this.setColour(230),this.setOutput(!0,"Number"),this.interpolateMsg("%1 %2",["OP",new Blockly.FieldDropdown(t)],["NUM","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT);var e=this;this.setTooltip(function(){var t=e.getFieldValue("OP");return{ROOT:Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,ABS:Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,NEG:Blockly.Msg.MATH_SINGLE_TOOLTIP_NEG,LN:Blockly.Msg.MATH_SINGLE_TOOLTIP_LN,LOG10:Blockly.Msg.MATH_SINGLE_TOOLTIP_LOG10,EXP:Blockly.Msg.MATH_SINGLE_TOOLTIP_EXP,POW10:Blockly.Msg.MATH_SINGLE_TOOLTIP_POW10}[t]})}},Blockly.Blocks.math_modulo={init:function(){this.setHelpUrl(Blockly.Msg.MATH_MODULO_HELPURL),this.setColour(230),this.setOutput(!0,"Number"),this.interpolateMsg(Blockly.Msg.MATH_MODULO_TITLE,["DIVIDEND","Number",Blockly.ALIGN_RIGHT],["DIVISOR","Number",Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT),this.setInputsInline(!0),this.setTooltip(Blockly.Msg.MATH_MODULO_TOOLTIP)}},Blockly.Blocks.variables_get={init:function(){this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL),this.setColour(330),this.appendDummyInput().appendField(Blockly.Msg.VARIABLES_GET_TITLE).appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_GET_ITEM),"VAR").appendField(Blockly.Msg.VARIABLES_GET_TAIL),this.setOutput(!0),this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP),this.contextMenuMsg_=Blockly.Msg.VARIABLES_GET_CREATE_SET,this.contextMenuType_="variables_set"},getVars:function(){return[this.getFieldValue("VAR")]},renameVar:function(t,e){Blockly.Names.equals(t,this.getFieldValue("VAR"))&&this.setFieldValue(e,"VAR")},customContextMenu:function(t){var e={enabled:!0},o=this.getFieldValue("VAR");e.text=this.contextMenuMsg_.replace("%1",o),(o=goog.dom.createDom("field",null,o)).setAttribute("name","VAR"),(o=goog.dom.createDom("block",null,o)).setAttribute("type",this.contextMenuType_),e.callback=Blockly.ContextMenu.callbackFactory(this,o),t.push(e)}},Blockly.Blocks.variables_set={init:function(){this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL),this.setColour(330),this.interpolateMsg(Blockly.Msg.VARIABLES_SET_TITLE+" %1 "+Blockly.Msg.VARIABLES_SET_TAIL+" %2",["VAR",new Blockly.FieldVariable(Blockly.Msg.VARIABLES_SET_ITEM)],["VALUE",null,Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT),this.setPreviousStatement(!0),this.setNextStatement(!0),this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP),this.contextMenuMsg_=Blockly.Msg.VARIABLES_SET_CREATE_GET,this.contextMenuType_="variables_get"},getVars:function(){return[this.getFieldValue("VAR")]},renameVar:function(t,e){Blockly.Names.equals(t,this.getFieldValue("VAR"))&&this.setFieldValue(e,"VAR")},customContextMenu:Blockly.Blocks.variables_get.customContextMenu},Blockly.Blocks.text={init:function(){this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL),this.setColour(160),this.appendDummyInput().appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""),"TEXT").appendField(this.newQuote_(!1)),this.setOutput(!0,"String"),this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP)},newQuote_:function(t){return '"';}},Blockly.Blocks.text_join={init:function(){this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL),this.setColour(160),this.appendValueInput("ADD0").appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH),this.appendValueInput("ADD1"),this.setOutput(!0,"String"),this.setMutator(new Blockly.Mutator(["text_create_join_item"])),this.setTooltip(Blockly.Msg.TEXT_JOIN_TOOLTIP),this.itemCount_=2},mutationToDom:function(){var t=document.createElement("mutation");return t.setAttribute("items",this.itemCount_),t},domToMutation:function(t){for(var e=0;e<this.itemCount_;e++)this.removeInput("ADD"+e);for(this.itemCount_=parseInt(t.getAttribute("items"),10),e=0;e<this.itemCount_;e++)t=this.appendValueInput("ADD"+e),0==e&&t.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH);0==this.itemCount_&&this.appendDummyInput("EMPTY").appendField(new Blockly.FieldImage(Blockly.pathToBlockly+"media/quote0.png",12,12,'"')).appendField(new Blockly.FieldImage(Blockly.pathToBlockly+"media/quote1.png",12,12,'"'))},decompose:function(t){var e=Blockly.Block.obtain(t,"text_create_join_container");e.initSvg();for(var o=e.getInput("STACK").connection,n=0;n<this.itemCount_;n++){var l=Blockly.Block.obtain(t,"text_create_join_item");l.initSvg(),o.connect(l.previousConnection),o=l.nextConnection}return e},compose:function(t){if(0==this.itemCount_)this.removeInput("EMPTY");else for(var e=this.itemCount_-1;0<=e;e--)this.removeInput("ADD"+e);for(this.itemCount_=0,t=t.getInputTargetBlock("STACK");t;)e=this.appendValueInput("ADD"+this.itemCount_),0==this.itemCount_&&e.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH),t.valueConnection_&&e.connection.connect(t.valueConnection_),this.itemCount_++,t=t.nextConnection&&t.nextConnection.targetBlock();0==this.itemCount_&&this.appendDummyInput("EMPTY").appendField(new Blockly.FieldImage(Blockly.pathToBlockly+"media/quote0.png",12,12,'"')).appendField(new Blockly.FieldImage(Blockly.pathToBlockly+"media/quote1.png",12,12,'"'))},saveConnections:function(t){t=t.getInputTargetBlock("STACK");for(var e=0;t;){var o=this.getInput("ADD"+e);t.valueConnection_=o&&o.connection.targetConnection,e++,t=t.nextConnection&&t.nextConnection.targetBlock()}}},Blockly.Blocks.text_create_join_container={init:function(){this.setColour(160),this.appendDummyInput().appendField(Blockly.Msg.TEXT_CREATE_JOIN_TITLE_JOIN),this.appendStatementInput("STACK"),this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP),this.contextMenu=!1}},Blockly.Blocks.text_create_join_item={init:function(){this.setColour(160),this.appendDummyInput().appendField(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TITLE_ITEM),this.setPreviousStatement(!0),this.setNextStatement(!0),this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TOOLTIP),this.contextMenu=!1}},Blockly.Blocks.text_append={init:function(){this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL),this.setColour(160),this.appendValueInput("TEXT").appendField(Blockly.Msg.TEXT_APPEND_TO).appendField(new Blockly.FieldVariable(Blockly.Msg.TEXT_APPEND_VARIABLE),"VAR").appendField(Blockly.Msg.TEXT_APPEND_APPENDTEXT),this.setPreviousStatement(!0),this.setNextStatement(!0);var t=this;this.setTooltip(function(){return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace("%1",t.getFieldValue("VAR"))})},getVars:function(){return[this.getFieldValue("VAR")]},renameVar:function(t,e){Blockly.Names.equals(t,this.getFieldValue("VAR"))&&this.setFieldValue(e,"VAR")}},Blockly.Blocks.text_length={init:function(){this.setHelpUrl(Blockly.Msg.TEXT_LENGTH_HELPURL),this.setColour(160),this.interpolateMsg(Blockly.Msg.TEXT_LENGTH_TITLE,["VALUE",["String","Array"],Blockly.ALIGN_RIGHT],Blockly.ALIGN_RIGHT),this.setOutput(!0,"Number"),this.setTooltip(Blockly.Msg.TEXT_LENGTH_TOOLTIP)}};