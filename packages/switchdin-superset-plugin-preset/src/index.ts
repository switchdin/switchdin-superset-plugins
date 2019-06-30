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
import { Preset } from '@superset-ui/core';
import BigNumberImage from '@switchdin-superset/switchdin-superset-plugin-big-number-image';
import Weather from '@switchdin-superset/switchdin-superset-plugin-weather';
import Gauge from '@switchdin-superset/switchdin-superset-plugin-gauge';
import RichImage from '@switchdin-superset/switchdin-superset-plugin-rich-image';

export class SwitchDinPreset extends Preset {
  constructor() {
    super({
      name: 'SwitchDin Charts',
      presets: [],
      plugins: [new BigNumberImage['ChartPlugin']().configure({ key: 'big_number_image' }),
                new Gauge['ChartPlugin']().configure({ key: 'gauge' }),
                new Weather['ChartPlugin']().configure({ key: 'weather' }),
                new RichImage['ChartPlugin']().configure({ key: 'rich_image' }),
      ],
    });
  }
}
