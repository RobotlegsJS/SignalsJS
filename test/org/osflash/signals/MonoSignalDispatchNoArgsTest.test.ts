/**
 * Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../../../entry";

import { assert } from "chai";

import { AsyncUtil } from "../../../util/AsyncUtil";
import { MonoSignal } from "../../../../src/org/osflash/signals/MonoSignal";

describe("MonoSignalDispatchNoArgsTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let completed: MonoSignal;

    function onCompleted(): void {
        assert.equal(0, arguments.length);
    }

    function secondAddOnceListener(): void {}

    function addOnceInHandler(doneCallback: Function): void {
        completed.addOnce(async.add(secondAddOnceListener, 10, doneCallback));
        completed.dispatch();
    }

    beforeEach(() => {
        completed = new MonoSignal();
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
    });

    it("dispatch_no_args_should_call_listener_with_no_args()", (done) => {
        completed.add(async.add(onCompleted, 10, done));
        completed.dispatch();
    });

    it("addOnce_in_handler_and_dispatch_should_call_new_listener()", (done) => {
        completed.addOnce(async.add(addOnceInHandler, 10));
        completed.dispatch(done);
    });
});
