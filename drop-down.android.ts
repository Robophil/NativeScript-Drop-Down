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

import * as common from "./drop-down-common";
import { PropertyChangeData } from "ui/core/dependency-observable";
import { View } from "ui/core/view";
import { Label } from "ui/label";
import { StackLayout } from "ui/layouts/stack-layout";
import { Color } from "color";
import * as types from "utils/types";
import {ObservableArray} from "data/observable-array";


global.moduleMerge(common, exports);

const LABELVIEWID = "spinner-label";

enum RealizedViewType {
    ItemView,
    DropDownView
}

export class DropDown extends common.DropDown {

    private _android: android.widget.Spinner;
    private _androidViewId: number;
    private _arrayAdapter: android.widget.ArrayAdapter<string>;

    public _createUI() {
        this._android = new android.widget.Spinner(this._context, 0);

        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);

        this._arrayAdapter = new android.widget.ArrayAdapter<string>(this._context, android.R.layout.simple_spinner_item);
        this._arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        this._arrayAdapter.add("Cash");
        this._arrayAdapter.add("Somethin else");


        this._android.setAdapter(this._arrayAdapter);

        let that = new WeakRef(this);
        this.android.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
            onItemSelected(parent: any, convertView: android.view.View, index: number, id: number) {
                let owner = that.get();
                owner._selectedIndexInternal = index;
            },
            onNothingSelected() { /* Currently Not Needed */ }
        }));
    }

    get android(): android.widget.Spinner {
        return this._android;
    }


    set _selectedIndexInternal(value: number) {
        if (this.android) {
            this.android.setSelection(value);
        }
    }
    
    public open() {
        this._android.performClick();
    }

    public _onItemsPropertyChanged(data: PropertyChangeData) {
        if (!this._android || !this._android.getAdapter()) {
            return;
        }
        this._arrayAdapter.clear();

        let items = <ObservableArray<string>>data.newValue;
        for(let i=0; i<items.length; i++){
            this._arrayAdapter.add(items.getItem(i));
        }
        (<android.widget.ArrayAdapter<string>>this.android.getAdapter()).notifyDataSetChanged();
    }

    public _onDetached(force?: boolean) {
        super._onDetached(force);
    }

    public _onSelectedIndexPropertyChanged(data: PropertyChangeData) {
        super._onSelectedIndexPropertyChanged(data);
        this._android.setSelection(data.newValue);
    }

    public _onHintPropertyChanged(data: PropertyChangeData) {
        if (!this._android || !this._android.getAdapter()) {
            return;
        }
    }
}