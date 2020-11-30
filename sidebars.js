/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  someSidebar: {
    HTML: [
      'html/Basics',
      'html/references',
    ],
    CSS: [
      {
        '基本语法': [
          'css/Inheritance',
          'css/Specificity',
          'css/Selector',
          'css/CSSOM',
        ]
      },
      {
        '布局': [
          'css/Flex',
        ]
      },
      {
        '排版': [
          'css/BFC',
          'css/Box-Mode',
          'css/Cascading-Context',
        ]
      },
      {
        '经典问题汇总': [
          'css/Unit',
          'css/Align',
          'css/shapes',
        ]
      }
    ],
    Javascript: [
      'javascript/Scope',
      'javascript/Execution-Context',
      'javascript/Closure',
      'javascript/Prototype',
      'javascript/Inheritance',
      'javascript/This',
      'javascript/Declaration',
      'javascript/Control-Flow',
      'javascript/Module',
      'javascript/RegExp',
    ],
    Browser: [
      'browser/DOM',
      'browser/Event-Loop',
      'browser/Rendering',
      'browser/Inside',
    ],
    Performance: [
      'performance/Reflow',
    ],
    Graphics: [
      'graphics/Canvas',
      'graphics/SVG',
    ],  
    React: [
      'react/fundamentals',
      'react/hooks',
      'react/principal',
      {
        '状态同步': [
          'react/redux',
          'react/react-query',
        ]
      },
      'react/questions',
    ],
    Vue: [
      'vue/Basic'
    ],
    Node: [
      {
        'IO': [
          'node/REPL',
          'node/Buffer',
          'node/Stream',
          'node/File-System',
        ]
      },
      {
        '模块': [
          'node/Module',
          'node/HMR',
        ]
      },
      {
        '进程': [
          'node/Process',
          'node/Cluster',
        ]
      },
      {
        '网络': [
          'node/Net',
          'node/HTTP',
        ]
      },
      {
        '存储': [
          'node/Mongodb',
        ]
      },
      {
        '操作系统': [
          'node/OS',
        ]
      },
      {
        '错误处理': [
          'node/Errors',
        ]
      },
      {
        '实用工具': [
          'node/URL',
          'node/Query-String',
        ]
      },
      'node/Questions',
      'node/Node_Ref',
    ],
    Secure: [
      'secure/checklist',
      'secure/Crypto',
      'secure/MITM-Attack',
      'secure/XSS',
      'secure/CSRF',
    ],
    Engineering: [
      'engineering/git',
      'engineering/lint',
      'engineering/npm',
      'engineering/webpack',
      'engineering/integration'
    ],
    Algorithms: ['algorithms/total']
  }
};