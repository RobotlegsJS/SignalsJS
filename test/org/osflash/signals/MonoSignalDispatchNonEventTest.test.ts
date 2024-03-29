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

describe("MonoSignalDispatchNonEventTest", () => {
    let async: AsyncUtil = new AsyncUtil();

    let completed: MonoSignal;

    function onZero(num: number): void {
        assert.equal(0, num);
    }

    function onZeroZero(a: any, b: any): void {
        assert.equal(0, a);
        assert.equal(0, b);
    }

    function checkNullDate(date: Date): void {
        assert.isNull(date);
    }

    beforeEach(() => {
        completed = new MonoSignal(Date);
    });

    afterEach(() => {
        completed.removeAll();
        completed = null;
    });

    /**
     * Captures bug where dispatching 0 was considered null.
     */
    it("dispatch_zero_should_call_listener_with_zero()", (done) => {
        completed = new MonoSignal(Number);
        completed.add(async.add(onZero, 10, done));
        completed.dispatch(0);
    });

    it("dispatch_2_zeroes_should_call_listener_with_2_zeroes()", (done) => {
        completed = new MonoSignal(Number, Number);
        completed.add(async.add(onZeroZero, 10, done));
        completed.dispatch(0, 0);
    });

    it("dispatch_null_should_call_listener_with_null()", (done) => {
        completed.addOnce(async.add(checkNullDate, 10, done));
        completed.dispatch(null);
    });
});
