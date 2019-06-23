/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/* eslint-disable sort-keys */

import { CategoricalScheme } from '@superset-ui/color';

const schemes = [
  {
    id: 'switchdinColors',
    label: 'SwitchDin Colors',
    colors: [ '#00B299',
              '#40C5B2',
              '#80D8CC',
              '#C0EBE5',
              '#CDD0D2',
              '#9BA0A4',
              '#697177',
              '#37424A',
             ],
  },
  {
    id: 'yurikaColors',
    label: 'Yurika Colors',
    colors: [ "#5a287f",
              "#8c3a6c",
              "#cc5154",
              "#d06141",
              "#d7801c",
             ],
  },
].map(s => new CategoricalScheme(s));

export default schemes;
