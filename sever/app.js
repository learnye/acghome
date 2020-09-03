//引入Express模块
const express = require('express')

//引入body-parser中间件
const bodyParser = require("body-parser");

//引入CORS模块
const cors = require('cors');

//加载FS(FileSystem)模块
const fs = require('fs');

//加载Multer模块
const multer = require('multer');
//创建Multer对象实例,其中dest(destination,译为目标)参数
//用于指定上传文件的目录
//定制Multer的存储规则
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = '../src/assets/image/products';
        //判断目录是否存在,如果不存在,则自动创建之
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, (err) => {
                throw err;
            });
        }
        cb(null, path);
    },
    filename: function (req, file, cb) {
        //获取上传文件的原始名称
        let originalname = file.originalname;
        //将主文件名与扩展名拼接在一起==>新的文件名称
        let filename = originalname;
        //调用回调函数
        cb(null, filename);

    }
});

//根据自定义存储规则来创建Multer对象实例
const upload2 = multer({ storage: storage });
//引入MYSQL模块
const mysql = require('mysql');
const {
    privateEncrypt
} = require('crypto');

//创建MYSQL连接池
const pool = mysql.createPool({
    //数据库服务器地址
    host: '127.0.0.1',
    //数据库用户名
    user: 'root',
    //数据库用户密码
    password: '',
    //数据库服务器端口号
    port: 3306,
    //数据库名称
    database: 'mimart',
    //编码方式
    charset: 'utf8',
    //连接阈值
    connectionLimit: 15
})

//创建Express实例
const server = express();

//引用body-parser中间件，将post请求数据解析为对象
server.use(bodyParser.urlencoded({
    extended: false
}));

//将CORS作为Server的中间件使用
server.use(cors({
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080']
}));
/* ------------------------------------------------------后台管理路由------------------------------------------------------------ */
// 后台登录路由
server.get('/ad_login', (req, res) => {
    let _adname = req.query.adname;
    let _adpwd = req.query.adpwd;
    let sql = "select adname from admin where adname=? and adpwd=?";
    pool.query(sql, [_adname, _adpwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '登录成功',
            });
        } else {
            res.send({
                code: 0,
                message: '登录失败',
            });
        }
    })
})
//接收自定义规则多文件上传时的接口
server.post('/custom', upload2.any(), (req, res) => {
    // console.log(req.body);
    res.send("OK");
});
// 后台获取所有商品并分页
server.get('/back_prolist', (req, res) => {
    var _page = req.query.page;
    var _limit = req.query.limit;
    var sql = "select pro_info.pid as pid,pro_info.pmanu as pmenu,pro_info.ptype as type,pro_spec.sprice as price,pro_info.pname as pname,pro_info.Pdesc as description,pro_info.pintr as introduce,pro_info.pdisc as discount,pro_info.pimage as image,pro_info.ptotal as total,pro_info.plike as plike,pro_info.pkeyword as keyword,pro_info.psold as sold from pro_info left outer join pro_spec on pro_info.pid=pro_spec.spid where pro_spec.sprice>200 order by plike desc limit ? , ? ;"

    var sql1 = "select * from pro_info";
    pool.query(sql1, (error, result) => {
        var pageCount = Math.ceil(result.length / _limit);
        // console.log(pageCount)
        var Count = result.length;
        pool.query(sql, [(parseInt((_page - 1) * _limit)), parseInt(_limit)], (error, results) => {
            if (error) throw error
            if (result.length > 0) {
                res.send({
                    code: 1,
                    message: '查询成功',
                    pageCount: pageCount,
                    Count: Count,
                    prolist: results
                });
            } else {
                res.send({
                    code: 0,
                    message: '查询失败',
                });
            }
        })
    })
})
// 后台获取对应商品
server.get('/like_prolist', (req, res) => {
    var _page = req.query.page;
    var _limit = req.query.limit;
    var _pname = req.query.pname;
    var sql = "select pro_info.pid as pid,pro_info.pmanu as pmenu,pro_info.ptype as type,pro_spec.sprice as price,pro_info.pname as pname,pro_info.Pdesc as description,pro_info.pintr as introduce,pro_info.pdisc as discount,pro_info.pimage as image,pro_info.ptotal as total,pro_info.plike as plike,pro_info.pkeyword as keyword,pro_info.psold as sold from pro_info left outer join pro_spec on pro_info.pid=pro_spec.spid where pname like ? and pro_spec.sprice>200 order by plike desc limit ? , ? ;"

    var sql1 = "select pname from pro_info where pname like ?";
    pool.query(sql1, [`%${_pname}%`], (error, result) => {
        var pageCount = Math.ceil(result.length / _limit);
        // console.log(pageCount)
        var Count = result.length;
        pool.query(sql, [`%${_pname}%`, (parseInt((_page - 1) * _limit)), parseInt(_limit)], (error, results) => {
            if (error) throw error
            if (result.length > 0) {
                res.send({
                    code: 1,
                    message: '查询成功',
                    pageCount: pageCount,
                    Count: Count,
                    prolist: results
                });
            } else {
                res.send({
                    code: 0,
                    message: '查询失败',
                });
            }
        })
    })
})
// 后台向数据库插入数据
server.post('/insert_product', (req, res) => {
    // let _pname=req.body.pname;
    // console.log(_pname);
    let sql = "insert into pro_info set ?";
    pool.query(sql, [req.body], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 1,
                message: '插入成功'
            });
        } else {
            res.send({
                code: 0,
                message: '插入失败'
            });
        }
    })
})
// 后台向保存价格和规格的表插入数据
server.post('/insert_spec', (req, res) => {
    let sql = "insert into pro_spec set ?"
    pool.query(sql, [req.body], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 1,
                message: '插入成功'
            });
        } else {
            res.send({
                code: 0,
                message: '插入失败'
            });
        }
    })
});
// 后台获取id对应的商品信息
server.get('/show_product', (req, res) => {
    let _pid = req.query.pid;
    // console.log(_pid);
    let sql = "select pro_info.pid as pid,pro_info.pmanu as pmanu,pro_info.ptype as ptype,pro_spec.sprice as sprice,pro_info.pname as pname,pro_info.Pdesc as pdesc,pro_info.pdisc as pdisc,pro_info.pimage as image,pro_info.ptotal as ptotal,pro_info.pintr as pintr,pro_spec.spec as spec from pro_info left outer join pro_spec on pro_info.pid=pro_spec.spid where pro_spec.sprice > 200 and pid=?"
    pool.query(sql, [_pid], (err, result) => {
        if (err) throw err;
        // console.log(result)
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '查询成功',
                result: result[0]
            });
        } else {
            res.send({
                code: 0,
                message: '查询失败',
            });
        }
    })
})
// 后台向商品表更新数据
server.put('/update_product', (req, res) => {
    let _pid = req.body.pid;
    // console.log(_pid);
    let sql = "update pro_info set ? where pid=?";
    pool.query(sql, [req.body, _pid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 1,
                message: '修改成功'
            });
        } else {
            res.send({
                code: 0,
                message: '修改失败'
            });
        }
    })
})
// 后台向保存价格和规格的表修改数据
server.put('/update_spec', (req, res) => {
    let _spid = req.body.spid;
    // console.log(_spid);
    let sql = "update pro_spec set ? where spid=?"
    pool.query(sql, [req.body, _spid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 1,
                message: '修改成功'
            });
        } else {
            res.send({
                code: 0,
                message: '修改失败'
            });
        }
    })
});
// 后台根据pid删除指定商品
server.delete('/delete_product', (req, res) => {
    let _pid = req.query.pid;
    // console.log(_pid);
    let sql1 = 'DELETE  FROM pro_info WHERE pid=? ';
    let sql = 'DELETE  FROM pro_spec WHERE spid=? ';
    pool.query(sql, [_pid], (err, result) => {
        if (err) throw err;
        pool.query(sql1, [_pid], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.send({
                    code: 1,
                    message: '删除成功'
                });
            } else {
                res.send({
                    code: 0,
                    message: '删除失败'
                });
            }
        })
    })
})

// 后台管理密码修改
server.put('/update_pwd', (req, res) => {
    let _pwd1 = req.body.pwd1;
    let _pwd2 = req.body.pwd2;
    console.log(_pwd1);
    let sql = 'update admin set adpwd=?  where adpwd=? ';
    pool.query(sql, [_pwd2, _pwd1], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 1,
                message: '删除成功'
            });
        } else {
            res.send({
                code: 0,
                message: '删除失败'
            });
        }
    });
})
/* -------------------------------------------------------前台路由--------------------------------------------------------------- */
//获取所有商品，按给定的顺序排列
server.get('/prolist', (req, res) => {
    var _orderby = req.query.orderby;
    var _order = req.query.order;
    var _page = req.query.page;
    var _limit = req.query.limit;
    var sql = "select pro_info.pid as pid,pro_spec.sprice as price,pro_info.pname as pname,pro_info.Pdesc as description,pro_info.pimage as image,pro_info.psold as sold from pro_info left outer join pro_spec on pro_info.pid=pro_spec.spid where pro_spec.sprice>200 order by ? ? limit ? , ? ;"
    sql = sql.split(" ");
    if (_orderby == "") {
        _orderby = "plike";
    }
    if (_order == "") {
        _order = "desc";
    }
    if (_page == "" || _page < 1) {
        _page = 1;
    }
    sql[26] = _orderby;
    sql[27] = _order;
    sql[29] = (_page - 1) * _limit;
    sql[31] = _limit;
    sql1 = sql.slice(0, -9).join(" ");
    sql = sql.join(" ");
    pool.query(sql1, (error, result) => {
        var pageCount = Math.ceil(result.length / _limit);
        pool.query(sql, (error, result) => {
            if (error) throw error
            if (result.length > 0) {
                res.send({
                    code: 1,
                    message: '查询成功',
                    pageCount: pageCount,
                    prolist: result
                });
            } else {
                res.send({
                    code: 0,
                    message: '查询失败',
                });
            }
        })
    })
})

//搜索特定的商品，按顺序排列。
server.get('/prolist_search', (req, res) => {
    var _ptype = req.query.ptype;
    var _pmanu = req.query.pmanu;
    var _keyword = req.query.keyword;
    var _orderby = req.query.orderby;
    var _order = req.query.order;
    var _page = req.query.page;
    var _limit = req.query.limit;
    var _ptotal = req.query.ptotal;
    var _pdisc = req.query.pdisc;
    if (_keyword != "") {
        _keyword = "%" + _keyword + "%";
    }
    if (_orderby == "") {
        _orderby = "plike";
    }
    if (_order == "") {
        _order = "desc";
    }
    if (_page == "" || _page < 1) {
        _page = 1;
    }
    var sql = "select pro_info.pid as pid,pro_spec.sprice as price,pro_info.pname as pname,pro_info.Pdesc as description,pro_info.pimage as image,pro_info.psold as sold,ptotal from pro_info left outer join pro_spec on pro_info.pid=pro_spec.spid where ? and pro_spec.sprice>200 order by ? ? limit ? , ? ;"
    sql = sql.split(" ");
    sql[28] = _orderby;
    sql[29] = _order;
    sql[31] = (_page - 1) * _limit;
    sql[33] = _limit;
    var querystr = "";
    if (_keyword != "") {
        if (_ptype != "" && _pmanu != "" && _pdisc != "" && _ptotal != "") {
            querystr = "pkeyword like ? and ptype = ? and pmanu = ? and pdisc>0 and ptotal>0";
        } else if (_ptype == "" && _pmanu != "" && _pdisc != "" && _ptotal != "") {
            querystr = "pkeyword like ? and pmanu = ? and pdisc>0 and ptotal>0";
        } else if (_ptype != "" && _pmanu == "" && _pdisc != "" && _ptotal != "") {
            querystr = "pkeyword like ? and ptype = ? and pdisc>0 and ptotal>0";
        } else if (_ptype != "" && _pmanu != "" && _pdisc == "" && _ptotal != "") {
            querystr = "pkeyword like ? and ptype = ? and pmanu = ? and ptotal>0";
        } else if (_ptype != "" && _pmanu != "" && _pdisc != "" && _ptotal == "") {
            querystr = "pkeyword like ? and ptype = ? and pmanu = ? and pdisc>0";
        } else if (_ptype != "" && _pmanu != "" && _pdisc == "" && _ptotal == "") {
            querystr = "pkeyword like ? and ptype = ? and pmanu = ?";
        } else if (_ptype != "" && _pmanu == "" && _pdisc == "" && _ptotal != "") {
            querystr = "pkeyword like ? and ptype = ? and ptotal >0";
        } else if (_ptype != "" && _pmanu == "" && _pdisc != "" && _ptotal == "") {
            querystr = "pkeyword like ? and ptype = ? and pdisc >0";
        } else if (_ptype == "" && _pmanu != "" && _pdisc == "" && _ptotal != "") {
            querystr = "pkeyword like ? and pmanu = ? and ptotal>0";
        } else if (_ptype == "" && _pmanu != "" && _pdisc != "" && _ptotal == "") {
            querystr = "pkeyword like ? and pmanu = ? and pdisc>0";
        } else if (_ptype == "" && _pmanu == "" && _pdisc != "" && _ptotal != "") {
            querystr = "pkeyword like ? and pdisc >0 and ptotal >0";
        } else if (_ptype != "" && _pmanu == "" && _pdisc == "" && _ptotal == "") {
            querystr = "pkeyword like ? and ptype = ?";
        } else if (_ptype == "" && _pmanu != "" && _pdisc == "" && _ptotal == "") {
            querystr = "pkeyword like ? and pmanu = ?";
        } else if (_ptype == "" && _pmanu == "" && _pdisc != "" && _ptotal == "") {
            querystr = "pkeyword like ? and pdisc>0";
        } else if (_ptype == "" && _pmanu == "" && _pdisc == "" && _ptotal != "") {
            querystr = "pkeyword like ? and ptotal>0";
        } else if (_ptype == "" && _pmanu == "" && _pdisc == "" && _ptotal == "") {
            querystr = "pkeyword like ?";
        }
    } else {
        if (_ptype != "" && _pmanu != "" && _pdisc != "" && _ptotal != "") {
            querystr = "ptype = ? and pmanu = ? and pdisc>0 and ptotal>0";
        } else if (_ptype == "" && _pmanu != "" && _pdisc != "" && _ptotal != "") {
            querystr = "pmanu = ? and pdisc>0 and ptotal>0";
        } else if (_ptype != "" && _pmanu == "" && _pdisc != "" && _ptotal != "") {
            querystr = "ptype = ? and pdisc>0 and ptotal>0";
        } else if (_ptype != "" && _pmanu != "" && _pdisc == "" && _ptotal != "") {
            querystr = "ptype = ? and pmanu = ? and ptotal>0";
        } else if (_ptype != "" && _pmanu != "" && _pdisc != "" && _ptotal == "") {
            querystr = "ptype = ? and pmanu = ? and pdisc>0";
        } else if (_ptype != "" && _pmanu != "" && _pdisc == "" && _ptotal == "") {
            querystr = "ptype = ? and pmanu = ?";
        } else if (_ptype != "" && _pmanu == "" && _pdisc == "" && _ptotal != "") {
            querystr = "ptype = ? and ptotal >0";
        } else if (_ptype != "" && _pmanu == "" && _pdisc != "" && _ptotal == "") {
            querystr = "ptype = ? and pdisc >0";
        } else if (_ptype == "" && _pmanu != "" && _pdisc == "" && _ptotal != "") {
            querystr = "pmanu = ? and ptotal>0";
        } else if (_ptype == "" && _pmanu != "" && _pdisc != "" && _ptotal == "") {
            querystr = "pmanu = ? and pdisc>0";
        } else if (_ptype == "" && _pmanu == "" && _pdisc != "" && _ptotal != "") {
            querystr = "pdisc >0 and ptotal >0";
        } else if (_ptype != "" && _pmanu == "" && _pdisc == "" && _ptotal == "") {
            querystr = "ptype = ?";
        } else if (_ptype == "" && _pmanu != "" && _pdisc == "" && _ptotal == "") {
            querystr = "pmanu = ?";
        } else if (_ptype == "" && _pmanu == "" && _pdisc != "" && _ptotal == "") {
            querystr = "pdisc>0";
        } else if (_ptype == "" && _pmanu == "" && _pdisc == "" && _ptotal != "") {
            querystr = "ptotal>0";
        }
    }
    sql[23] = querystr;
    // console.log(querystr);
    var sql1 = sql.slice(0, -9).join(" ");
    sql = sql.join(" ");
    var queryarr = [];
    if (_keyword != "") {
        queryarr.push(_keyword);
    }
    if (_ptype != "") {
        queryarr.push(_ptype);
    }
    if (_pmanu != "") {
        queryarr.push(_pmanu);
    }
    // console.log(sql1);
    // console.log(queryarr)
    pool.query(sql1, queryarr, (error, result) => {
        // console.log(result);
        var pageCount = Math.ceil(result.length / _limit);
        pool.query(sql, queryarr, (error, result) => {
            if (error) throw error;
            if (result.length > 0) {
                res.send({
                    code: 1,
                    message: '查询成功',
                    pageCount: pageCount,
                    prolist: result
                });
            } else {
                res.send({
                    code: 0,
                    message: '查询失败',
                });
            }
        })
    })
})

//获取厂商列表
server.get('/manus', (req, res) => {
    pool.query("select mid,mname from manus;", (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '查询成功',
                manulist: result
            });
        } else {
            res.send({
                code: 0,
                message: '查询失败',
            });
        }
    })
})

//获取搜索框列表
server.get('/searchwords', (req, res) => {
    let _keyword = req.query.keyword + "%";
    pool.query("select sword from searchwords where sword like ? order by hot desc limit 6 ;", [_keyword], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '查询成功',
                words: result
            });
        } else {
            res.send({
                code: 0,
                message: '查询失败',
            })
        }
    })
})

//获取商品信息
server.get("/proinfo", (req, res) => {
    var _pid = req.query.pid;
    pool.query("select spec,sprice as price from pro_spec where spid=?", _pid, (err, result) => {
        if (err) throw err;
        var specs = result;
        pool.query("select pname as productName,pdesc as description,ptotal,pimage as image from pro_info where pid=?", _pid, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    code: 1,
                    message: '查询成功',
                    proInfo: result,
                    specs: specs
                });
            } else {
                res.send({
                    code: 0,
                    message: '查询失败'
                });
            }
        })
    })
})

//获取收藏信息
server.get("/getliked", (req, res) => {
    var _pid = req.query.pid;
    var _uid = req.query.uid;
    pool.query("select lpid from user_like where luid=? and lpid= ?", [_uid, _pid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '查询成功'
            });
        } else {
            res.send({
                code: 0,
                message: '未找到结果'
            })
        }
    })
})

// 喜欢
server.post("/setliked", (req, res) => {
    var _liked = req.body.liked;
    var _pid = req.body.pid;
    var _uid = req.body.uid;
    if (_liked == "true") {
        // 用户新增喜欢
        pool.query("insert into user_like values (?,?)", [_uid, _pid], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.send({
                    code: 1,
                    message: "修改成功"
                })
            } else {
                res.send({
                    code: 0,
                    message: "修改失败"
                })
            }
        })
    } else {
        // 用户取消喜欢
        pool.query("delete from user_like where lpid=? and luid=?", [_pid, _uid], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.send({
                    code: 1,
                    message: "修改成功"
                })
            } else {
                res.send({
                    code: 0,
                    message: "修改失败"
                })
            }
        })
    }
})


//添加购物车
server.post("/add_to_cart", (req, res) => {
    var _opid = req.body.opid;
    var _ospec = req.body.ospec;
    var _ouid = req.body.ouid;
    var _odate = req.body.odate;
    var _ocount = req.body.ocount;
    var _ostate = 0;
    pool.query("insert into user_order (opid,ospec,ouid,ostate,odate,ocount,oischecked) values (?,?,?,?,?,?,1)", [_opid, _ospec, _ouid, _ostate, _odate, _ocount], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 1,
                message: "修改成功"
            })
        } else {
            res.send({
                code: 0,
                message: "修改失败"
            })
        }
    })
})

//更新订单
server.get("/update_cart", (req, res) => {
    var _ono = req.query.ono;
    pool.query("update user_order set ? where ono=?", [req.query, _ono], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 1,
                message: "修改成功"
            })
        } else {
            pool.query('select ocount from user_order where ono = ?', _ono,)
            res.send({
                code: 0,
                message: "修改失败",
                count: ocount
            })
        }
    })
})

//删除订单
server.get("/del_cart", (req, res) => {
    var _ono = req.query.ono;
    pool.query("delete from user_order where ono = ?", _ono, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 1,
                message: "删除成功"
            })
        } else {
            res.send({
                code: 0,
                message: "删除失败",
            })
        }
    })
})

//获取购物车中的商品信息
server.get("/cart", (req, res) => {
    var _uid = req.query.uid;
    pool.query("select oischecked as ischecked,ono as orderNo,pid,spec,pname as productName,sprice as price,ocount as count,pimage as image from user_order left outer join pro_info on pid=opid left outer join pro_spec on spid=opid and spec=ospec where ouid=? and ostate = 0;", _uid, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: "查询成功",
                shoplist: result
            })
        } else {
            res.send({
                code: 0,
                message: "查询失败"
            })
        }
    })
})

//获取评论列表
server.get("/comments", (req, res) => {
    var _pid = req.query.pid;
    var _page = req.query.page;
    pool.query("select avg(orate) as avg,count(orate) as count from user_order where opid = ?", _pid, (err, result) => {
        if (err) throw err;
        var averageRate = result[0].avg;
        var pageCount = Math.ceil(result[0].count / 8);
        var pageNow = _page * 8;
        pool.query("select ocontent as comment,odate as commentDate,nickname,avatar,orate as rate from user_order left outer join user_info on user_order.ouid=user_info.uid where opid = ? and ostate = 4 order by odate desc limit ?,8;", [_pid, pageNow], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    code: 1,
                    message: '查询成功',
                    comments: result,
                    averageRate: averageRate,
                    pageCount: pageCount
                });
            } else {
                res.send({
                    code: 0,
                    message: '查询失败'
                });
            }
        })
    })
})

// 获取商品描述图
server.get("/prodescs", (req, res) => {
    var _pid = req.query.pid;
    pool.query("select * from pro_desc where dpid=? limit 8", _pid, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '查询成功',
                descs: result
            });
        } else {
            res.send({
                code: 0,
                message: '查询失败'
            });
        }
    })
})


//登录
server.get('/login', (req, res) => {
    var _email = req.query.email;
    var _phone = req.query.phone;
    var _upwd = req.query.upwd;
    pool.query("select user.uid,user_info.avatar,user_info.nickname from user left outer join user_info on user.uid=user_info.uid where (email = ? and upwd = ?) or (phone = ? and upwd = ?) ", [_email, _upwd, _phone, _upwd], (err, result) => {
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '登录成功',
                userInfo: result
            });
        } else {
            res.send({
                code: 0,
                message: '登录失败'
            });
        }
    })
})

//注册
server.post("/regsist", (req, res) => {
    var _phone = req.body.phone;
    var _upwd = req.body.upwd;
    pool.query("insert into user values (null, ?, 0, ?, '')", [_upwd, _phone], (err, result) => {
        if (err) throw err;
        if (result.affectedRows != 0) {
            res.send({
                code: 1,
                message: '注册成功'
            });
        } else {
            res.send({
                code: 0,
                message: '注册失败'
            });
        }
    })
})

//获取个人信息
server.get("/get_userinfo", (req, res) => {
    var _uid = req.query.uid;
    pool.query("select avatar,nickname,gender from user_info where uid= ? ", _uid, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '查询成功',
                userInfo: result
            });
        } else {
            res.send({
                code: 0,
                message: '查询失败'
            });
        }

    });
})

server.get("/get_secinfo", (req, res) => {
    var _uid = req.query.uid;
    pool.query("select phone,email,secquestion from user_info left outer join user on user.uid=user_info.uid where user.uid= ?", _uid, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '查询成功',
                secInfo: result
            });
        } else {
            res.send({
                code: 0,
                message: '查询失败'
            });
        }
    });
})

server.get("/get_order", (req, res) => {
    var _uid = req.query.uid;
    pool.query("select odate as orderDate,Pimage as img,ostate as orderState,ono as orderNo,Ocount as orderCount,pname as productName,ospec as spec,sprice as price from pro_info left outer join user_order on user_order.opid=pro_info.pid left outer join pro_spec on pro_spec.spid=pro_info.pid where user_order.ouid = ? and pro_spec.spec=user_order.ospec order by odate desc;", _uid, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '查询成功',
                orderList: result
            });
        } else {
            res.send({
                code: 0,
                message: '查询失败',
            });
        }

    });
})

server.get("/get_like", (req, res) => {
    var _uid = req.query.uid;
    pool.query("select pname as productName,pimage as image,sprice as price,pdesc as description from pro_info left outer join user_like on user_like.lpid=pro_info.pid left outer join pro_spec on pro_spec.spid=pro_info.pid where luid=? and sprice > 201;", _uid, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '查询成功',
                likeList: result
            });
        } else {
            res.send({
                code: 0,
                message: '查询失败',
            });
        }

    });
})

server.get("/get_comment", (req, res) => {
    var _uid = req.query.uid;
    pool.query("select ocontent as userComment,outime as commentTime from user_order where ouid=? order by outime desc; ", _uid, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 1,
                message: '查询成功',
                comments: result
            });
        } else {
            res.send({
                code: 0,
                message: '查询失败',
            });
        }
    });
})

//指定服务器的监听端口号
server.listen(3000);