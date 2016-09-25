/*! *****************************************************************************
Copyright (c) 2015 Tangra Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
***************************************************************************** */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common = require("./drop-down-common");
global.moduleMerge(common, exports);
var LABELVIEWID = "spinner-label";
var RealizedViewType;
(function (RealizedViewType) {
    RealizedViewType[RealizedViewType["ItemView"] = 0] = "ItemView";
    RealizedViewType[RealizedViewType["DropDownView"] = 1] = "DropDownView";
})(RealizedViewType || (RealizedViewType = {}));
var DropDown = (function (_super) {
    __extends(DropDown, _super);
    function DropDown() {
        _super.apply(this, arguments);
    }
    DropDown.prototype._createUI = function () {
        this._android = new android.widget.Spinner(this._context, 0);
        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);
        this._arrayAdapter = new android.widget.ArrayAdapter(this._context, android.R.layout.simple_spinner_item);
        this._arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        this._arrayAdapter.add("Cash");
        this._arrayAdapter.add("Somethin else");
        this._android.setAdapter(this._arrayAdapter);
        var that = new WeakRef(this);
        this.android.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
            onItemSelected: function (parent, convertView, index, id) {
                var owner = that.get();
                owner._selectedIndexInternal = index;
            },
            onNothingSelected: function () { }
        }));
    };
    Object.defineProperty(DropDown.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDown.prototype, "_selectedIndexInternal", {
        set: function (value) {
            if (this.android) {
                this.android.setSelection(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    DropDown.prototype.open = function () {
        this._android.performClick();
    };
    DropDown.prototype._onItemsPropertyChanged = function (data) {
        if (!this._android || !this._android.getAdapter()) {
            return;
        }
        this._arrayAdapter.clear();
        var items = data.newValue;
        for (var i = 0; i < items.length; i++) {
            this._arrayAdapter.add(items.getItem(i));
        }
        this.android.getAdapter().notifyDataSetChanged();
    };
    DropDown.prototype._onDetached = function (force) {
        _super.prototype._onDetached.call(this, force);
    };
    DropDown.prototype._onSelectedIndexPropertyChanged = function (data) {
        _super.prototype._onSelectedIndexPropertyChanged.call(this, data);
        this._android.setSelection(data.newValue);
    };
    DropDown.prototype._onHintPropertyChanged = function (data) {
        if (!this._android || !this._android.getAdapter()) {
            return;
        }
    };
    return DropDown;
}(common.DropDown));
exports.DropDown = DropDown;
//# sourceMappingURL=drop-down.android.js.map