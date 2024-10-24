// Copyright 2023 The Pigweed Authors
//
// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

import { MockLogSource } from './custom/mock-log-source';
import { createLogViewer } from './createLogViewer';

const logSource = new MockLogSource();
const containerEl = document.querySelector(
    '#log-viewer-container'
) as HTMLElement;

let unsubscribe: () => void;

if (containerEl) {
    unsubscribe = createLogViewer(logSource, containerEl);
}

const TIMEOUT_DURATION = 60_000; // ms
// Start reading log data
logSource.start();

// Stop reading log data once timeout duration has elapsed
setTimeout(() => {
    logSource.stop();
    unsubscribe();
}, TIMEOUT_DURATION);
