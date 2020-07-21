'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path$4 = _interopDefault(require('path'));
var child_process = require('child_process');
require('fs-extra');
var ora = _interopDefault(require('ora'));
var rimraf$1 = _interopDefault(require('rimraf'));
var _static = require('mj-config/static');
var tapable = require('tapable');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var fs = require('fs');

var path = require('path');
var getPromiseFunc = function getPromiseFunc(func) {
  return function () {
    for (var _len = arguments.length, res = new Array(_len), _key = 0; _key < _len; _key++) {
      res[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      try {
        func.apply(null, [resolve, reject].concat(res));
      } catch (e) {
        reject(e);
      }
    });
  };
}; // module.exports = {
//     readFileSync,
//     getPromiseFunc
// }

var path$1 = require('path');

var inquirer = require('inquirer');

var chalk = require('chalk');

var _require = require("".concat(path$1.resolve(__dirname, '../localCache'))),
    readCacheOptions = _require.readCacheOptions,
    setCacheOptions = _require.setCacheOptions;

var _require2 = require('./configureFiles'),
    modulesConfig = _require2.modulesConfig,
    filterModules = _require2.filterModules;

var getInquirerResult = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var data, cacheOptions, op;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {};
            cacheOptions = readCacheOptions();

            if (!cacheOptions) {
              _context.next = 9;
              break;
            }

            _context.next = 5;
            return inquirer.prompt({
              type: 'list',
              name: 'option',
              message: '请选择缓存的选项：',
              choices: [].concat(_toConsumableArray(Object.keys(cacheOptions)), ['other'])
            });

          case 5:
            op = _context.sent;

            if (op.option === 'other') {
              data = getResult();
            } else {
              data = cacheOptions[op.option];
            }

            _context.next = 10;
            break;

          case 9:
            data = getResult();

          case 10:
            return _context.abrupt("return", data);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getInquirerResult() {
    return _ref.apply(this, arguments);
  };
}();
var getResult = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var moduleOptions, otherModule, otherOptions, isCache, cacheName, options;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return inquirer.prompt({
              type: 'list',
              name: 'options',
              message: '请选择下面的几种框架：',
              choices: modulesConfig.framework
            });

          case 2:
            moduleOptions = _context2.sent;
            otherModule = filterModules(moduleOptions.options);
            _context2.next = 6;
            return inquirer.prompt({
              type: 'checkbox',
              name: 'options',
              message: '请选择其他模块',
              choices: otherModule
            });

          case 6:
            otherOptions = _context2.sent;
            _context2.next = 9;
            return inquirer.prompt({
              type: 'confirm',
              name: 'cache',
              message: '是否保存当前的选项？'
            });

          case 9:
            isCache = _context2.sent;
            cacheName = {};
            options = [].concat(_toConsumableArray(moduleOptions.options !== 'other' ? require(path$1.resolve(__dirname, "../plugins/framework/".concat(moduleOptions.options))) : []), _toConsumableArray(otherOptions.options));

            if (!isCache.cache) {
              _context2.next = 21;
              break;
            }

          case 13:
            if (cacheName.name) {
              _context2.next = 20;
              break;
            }

            _context2.next = 16;
            return inquirer.prompt({
              type: 'input',
              name: 'name',
              message: '请输入保存的名称：'
            });

          case 16:
            cacheName = _context2.sent;

            if (cacheName.name === 'other') {
              console.log(chalk.red('当前名称不可输入，请重新输入'));
              cacheName.name = '';
            }

            _context2.next = 13;
            break;

          case 20:
            setCacheOptions({
              name: cacheName.name,
              module: options
            });

          case 21:
            return _context2.abrupt("return", {
              module: options
            });

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getResult() {
    return _ref2.apply(this, arguments);
  };
}(); // module.exports = {
//     getInquirerResult
// }

var rimraf = require('rimraf');

var fs$1 = require('fs');

var path$2 = require('path');

var plugins = fs$1.readdirSync(path$2.resolve(__dirname, '../plugins/defaultPlugins'));
var FrameWork = fs$1.readdirSync(path$2.resolve(__dirname, '../plugins/framework'));
var modulesConfig$1 = {
  module: plugins,
  framework: [].concat(_toConsumableArray(FrameWork), ['other'])
};

var rm = function rm(filePath) {
  rimraf(filePath, function (err) {
    if (err) console.log(err);
  });
}; // 配置文件的方法，如果调用到callback将会从源代码中删除对应模块


var configure = {
  path: '',
  eslint: {
    use: true,
    callback: function callback() {
      rm("".concat(this.path, "/.eslintrc.js"));
    }
  },
  jest: {
    use: true,
    callback: function callback() {
      rm("".concat(this.path, "/jest.config.js"));
      rm("".concat(this.path, "/test"));
    }
  }
};

var run = function run() {
  var keys = Object.keys(configure); // 没有使用的模块需要删除对应的代码文件

  keys.map(function (key) {
    !configure[key].use && typeof configure[key].use === 'boolean' && configure[key].callback.call(configure);
  });
};

configureFiles = function configureFiles(dirPath, config) {
  configure.path = dirPath; // 设置模块的使用情况

  config.map(function (name) {
    configure[name].use = false;
  });
  run();
};
// module.exports.modulesConfig = modulesConfig;
// module.exports.getDelConfig = getDelConfig;
// module.exports.filterModules = filterModules;

var fs$2 = require('fs');

var path$3 = require('path');

var fsE = require('fs-extra');

var copyFile = function copyFile(currentPath, toPath) {
  return new Promise(function (resolve, reject) {
    fsE.copy(currentPath, toPath, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};
var writeFile = function writeFile(url, data) {
  return new Promise(function (resolve, reject) {
    fs$2.writeFile(url, data, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};
var mkdir = function mkdir(path) {
  return new Promise(function (resolve, reject) {
    fs$2.mkdir(path, {
      recursive: true
    }, function (err) {
      if (err) reject(err);
      resolve();
    });
  });
};
//     copyFile,
//     writeFile,
//     mkdir,
//     emptyDir,
//     getDirNameByPath,
//     hasPath,
//     readFilesStream
// }

var Generator = function Generator() {
  var _this = this;

  _classCallCheck(this, Generator);

  _defineProperty(this, "createPackageJson", function (resolve) {
    writeFile("".concat(_this.rootPath, "/package.json"), JSON.stringify(_this.defaultPackageJson, null, '\t')).then(function () {
      resolve();
    });
  });

  _defineProperty(this, "createRootConfig", function (resolve) {
    if (_this.createConfig) {
      mkdir("".concat(_this.rootPath, "/config")).then(function () {
        resolve();
      });
    } else {
      resolve();
    }
  });

  _defineProperty(this, "createBabelConfig", function (resolve) {
    resolve();
  });

  _defineProperty(this, "createDir", function (resolve) {
    resolve();
  });

  this.hooks = {
    startGenerator: new tapable.SyncHook('startGenerator'),
    endGenerator: new tapable.SyncHook('endGenerator'),
    afterCreatePlugin: new tapable.SyncHook('afterCreatePlugin'),
    beforePackageJson: new tapable.SyncHook('beforePackageJson'),
    afterPackageJson: new tapable.AsyncSeriesWaterfallHook('afterPackageJson'),
    afterRootConfig: new tapable.SyncHook('afterRootConfig'),
    beforeBabelConfig: new tapable.SyncHook('beforeBabelConfig'),
    afterBabelConfig: new tapable.AsyncSeriesWaterfallHook('afterBabelConfig'),
    beforeDir: new tapable.SyncHook('beforeDir'),
    afterDir: new tapable.AsyncSeriesWaterfallHook('afterDir')
  };
  this.defaultPackageJson = require('./defaultPackage.json'); // key: 文件名 ， value: 文件内容

  this.rootPath = '';
  this.createConfig = false;
}; // module.exports =  Generator;

var modulesNameArr = ['PackageJson', 'RootConfig', 'BabelConfig', 'Dir'];
var callMap = {
  afterPackageJson: 'callAsync',
  afterDir: 'callAsync',
  afterBabelConfig: 'callAsync'
};

var createGenerator = function createGenerator() {
  return new Generator();
};

var createPlugins = function createPlugins(gen, options) {
  options.map(function (name) {
    try {
      require("./defaultPlugins/".concat(name)).apply(gen);
    } catch (e) {
      var plugin = new (require("./defaultPlugins/".concat(name)))();
      plugin.apply(gen);
    }
  });
  gen.hooks.afterCreatePlugin.call();
};

var doneFunc = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(gen, name) {
    var beforeName, afterName;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            beforeName = "before".concat(name);
            afterName = "after".concat(name);
            gen.hooks[beforeName] && gen.hooks[beforeName][callMap[beforeName] || 'call']();
            return _context.abrupt("return", getPromiseFunc(gen["create".concat(name)])().then(function () {
              if (callMap[afterName]) {
                gen.hooks[afterName][callMap[afterName]](function (err) {
                  if (err) throw err;
                });
              } else {
                gen.hooks[afterName].call();
              }
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function doneFunc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var modulesLoad$1 = modulesLoad = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options, renameParam) {
    var gen, rootPath, spinner;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            gen = createGenerator();
            rootPath = "".concat(_static.DIR, "/").concat(renameParam || 'template');
            gen.rootPath = rootPath;
            spinner = ora({
              text: '正在下载',
              discardStdin: false
            }).start();
            createPlugins(gen, options);
            gen.hooks.startGenerator.call();
            _context3.next = 8;
            return mkdir(rootPath);

          case 8:
            modulesNameArr.map( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return doneFunc(gen, name);

                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }());
            spinner.succeed('下载完成');

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function modulesLoad(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // module.exports = modulesLoad;

var getProgramName = function getProgramName(url) {
  var urlArr = url.split('/');
  var lastName = urlArr[urlArr.length - 1].split('.')[0];
  return lastName;
}; // 下载方法
// 本质上是调用git clone把远程库给安装到本地

var downLoadGit = function downLoadGit(url, renameParam) {
  var cwd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __dirname;
  return new Promise(function (resolve, reject) {
    var curName = renameParam || getProgramName(url);
    var spinner = ora({
      text: '正在下载',
      discardStdin: false
    }).start();
    var git = child_process.spawn('git', ['clone', url, curName], {
      cwd: cwd
    });
    git.on('error', function (err) {
      reject(err);
    });
    git.on('close', function (err, code) {
      rimraf$1("./".concat(curName, "/.git"), function () {
        spinner.succeed('下载完成');
        resolve(curName);
      });
    });
  });
};
// 1. 借用git进行下载
// 2. 直接copy本地项目
// 3. 将本地项目模块化，使用tapable的钩子的模式，进行模块的构建

var downLoad = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options, renameParam) {
    var module;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            module = options.module;
            modulesLoad$1(module, renameParam);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function downLoad(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // module.exports = {
//     downLoad,
//     downLoadGit,
//     getProgramName
// }

var reactInit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var argv, renameParam, options;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            argv = this.argvs.keyMap;
            renameParam = argv['-r'] || argv['--rename'] || '';
            _context.next = 4;
            return getInquirerResult();

          case 4:
            options = _context.sent;
            downLoad(options, renameParam);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function reactInit() {
    return _ref.apply(this, arguments);
  };
}(); // module.exports = reactInit;

// const path = require('path');

var downLoadByUrl = function downLoadByUrl(argvs, saveDirName) {
  var url = argvs['-u'] || argvs['--url'];

  if (url) {
    downLoadGit(url, name || getProgramName(url), path$4.resolve(__dirname, "../plugins/".concat(saveDirName)));
  } else {
    downLoadByNpm(argvs, saveDirName);
  }
};

var downLoadByNpm = function downLoadByNpm(argvs, saveDirName) {
  var npmName = argvs['-n'] || argvs['--npm'];

  if (npmName) {
    console.error('暂不支持通过npm添加');
  } else {
    downLoadByCurrent(argvs, saveDirName);
  }
};

var downLoadByCurrent = function downLoadByCurrent(argvs, saveDirName) {
  var currentDir = argvs['-c'] || argvs['--current'] || '';
  var rootPath = process.cwd(); // 当前目录地址

  var currentDirPath = path$4.resolve(rootPath, currentDir);
  var currentDirNameArr = currentDirPath.split('/');

  if (~currentDirPath.indexOf('\\')) {
    currentDirNameArr = currentDirPath.split('\\');
  }

  var currentDirName = currentDirNameArr[currentDirNameArr.length - 1];
  copyFile(currentDirPath, path$4.resolve(__dirname, "../plugins/".concat(saveDirName, "/").concat(currentDirName)));
};

function addPlugins () {
  var argvs = this.argvs.keyMap;
  var methods = argvs['-m'] || argvs['--methods'];
  var saveDirName = 'defaultPlugins';

  if (methods === 'framework') {
    saveDirName = 'framework';
  }

  var spinner = ora({
    text: '正在安装',
    discardStdin: false
  }).start();
  downLoadByUrl(argvs, saveDirName);
  spinner.succeed('安装完成');
}

// const reactInit = require('./command/reactInit');
module.exports = {
  reactInit: reactInit,
  addPlugins: addPlugins
};
