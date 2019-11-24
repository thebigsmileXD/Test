function manifest() {
    let name = document.getElementById("input_name").value;
    let description = document.getElementById("input_description").value;
    if (name == "") name = "undefined";
    if (description == "") description = "undefined";
    let output = `{\n  \"format_version\": 1,\n  \"header\": {\n    \"description\": \"${description}\",\n    \"name\": \"${name}\",\n    \"uuid\": \"${uuid()}\",\n    \"version\": [0, 0, 1],\n    \"min_engine_version\": [1, 13, 0]\n  },\n  \"modules\": [\n    {\n      \"description\": \"${description}\",\n      \"type\": \"data\",\n      \"uuid\": \"${uuid()}\",\n      \"version\": [0, 0, 1]\n    }\n  ]\n}`;
    document.forms.fm.output.value = output;
    let copyTarget = document.getElementById("output");
    copyTarget.select();
    document.execCommand("Copy");
    alert("コピーしました└(՞ةڼ◔)」");
}

// ドロップダウンメニュー
$(function() {
    // ドロップダウンメニュー
    $('.dropdown-btn').hover(
        function() {
            //カーソルが重なった時
            $(this).children('.dropdown').addClass('open');
        },
        function() {
            //カーソルが離れた時
            $(this).children('.dropdown').removeClass('open');
        }
    );
    // グローバルナビの開閉
    $(function() {
        $('.nav-button-wrap').on('click', function() {
            if ($(this).hasClass('active')) {
                // スマホ用メニューが表示されていたとき
                $(this).removeClass('active');
                $('.globalnav').addClass('close');
                $('.globalnav-wrap , body').removeClass('open');
            } else {
                // スマホ用メニューが非表示の時
                $(this).addClass('active');
                $('.globalnav').removeClass('close');
                $('.globalnav-wrap , body').addClass('open');
            }
        });
    });
});


$(function() {
    //Form要素を取得する
    var form = document.forms.testuplode;
    //ファイルが読み込まれたときの処理
    form.myfile.addEventListener('change', function(e) {
        //resultにファイルの要素を代入
        var result = e.target.files[0];
        //FileReaderのインスタンスを作成する
        var reader = new FileReader();
        if (result.type.indexOf("image") == 0) {
            //読み込んだファイルの中身を取得(img)
            reader.readAsDataURL(result);
            //ファイルの中身を取得後に処理を行う
            reader.addEventListener('load', function() {
                //要素削除
                $("#outputtext").remove();
                $("#img").remove();
                //要素追加
                $("#testuplode").append('<p><img id="img"></p>')
                    //srcに画像をぶちこむ
                document.querySelector("img").src = reader.result;
            });
        } else if (result.name.slice(-12) == ".mcstructure") {
            reader.onload = function(evt) {
                var allData = evt.target.result; //ファイル内容を全て取得
                var bin = "";
                for (var i = 0; i < allData.length; i++) {
                    var s = allData.charCodeAt(i); //16進数で表示
                    if (s == 10) {
                        tagname_count = allData.charCodeAt(i + 2) * 16 + allData.charCodeAt(i + 1);
                        var tagname = [];
                        for (tagname_loop = 1; tagname_loop <= tagname_count; tagname_loop++) {
                            try {
                                tagname.push(decodeURI("%" + (`00` + allData.charCodeAt(i + 2 + tagname_loop).toString(16)).slice(-2)));
                            } catch (e) {}
                        }
                        let tagname_result = tagname.join(``);
                        console.log("Compound:name=" + tagname_result);
                        i += (2 + tagname_count);
                        continue;
                    }
                    if (s == 8) {
                        tagname_count = allData.charCodeAt(i + 2) * 16 + allData.charCodeAt(i + 1);
                        var tagname = [];
                        for (tagname_loop = 1; tagname_loop <= tagname_count; tagname_loop++) {
                            try {
                                tagname.push(decodeURI("%" + (`00` + allData.charCodeAt(i + 2 + tagname_loop).toString(16)).slice(-2)));
                            } catch (e) {}
                        }
                        let tagname_result = tagname.join(``);
                        value_count = allData.charCodeAt(i + 2 + tagname_count + 2) * 16 + allData.charCodeAt(i + 1 + tagname_count + 2);
                        var value = [];
                        for (value_loop = 1; value_loop <= value_count; value_loop++) {
                            try {
                                value.push(decodeURI("%" + (`00` + allData.charCodeAt(i + 2 + value_loop + tagname_count + 2).toString(16)).slice(-2)));
                            } catch (e) {}
                        }
                        let value_result = value.join(``);
                        console.log("String:name=\"" + tagname_result + " value=\"" + value_result + "\"");
                        i += (2 + tagname_count + 2 + value_count);
                        continue;
                    }
                    if (s == 1) {
                        tagname_count = allData.charCodeAt(i + 2) * 16 + allData.charCodeAt(i + 1);
                        var tagname = [];
                        for (tagname_loop = 1; tagname_loop <= tagname_count; tagname_loop++) {
                            try {
                                tagname.push(decodeURI("%" + (`00` + allData.charCodeAt(i + 2 + tagname_loop).toString(16)).slice(-2)));
                            } catch (e) {}
                        }
                        let tagname_result = tagname.join(``);
                        value_count = 1;
                        var value = [];
                        for (value_loop = value_count; value_loop >= 1; value_loop--) {
                            try {
                                value.push((`00` + allData.charCodeAt(i + value_loop + tagname_count + 2).toString(16)).slice(-2));
                            } catch (e) {}
                        }
                        let value_result = parseInt(value.join(``), 16);
                        console.log("Byte:name=\"" + tagname_result + "\" value=" + value_result);
                        i += (2 + tagname_count + value_count);
                        continue;
                    }
                    if (s == 2) {
                        tagname_count = allData.charCodeAt(i + 2) * 16 + allData.charCodeAt(i + 1);
                        var tagname = [];
                        for (tagname_loop = 1; tagname_loop <= tagname_count; tagname_loop++) {
                            try {
                                tagname.push(decodeURI("%" + (`00` + allData.charCodeAt(i + 2 + tagname_loop).toString(16)).slice(-2)));
                            } catch (e) {}
                        }
                        let tagname_result = tagname.join(``);
                        value_count = 2;
                        var value = [];
                        for (value_loop = value_count; value_loop >= 1; value_loop--) {
                            try {
                                value.push((`00` + allData.charCodeAt(i + value_loop + tagname_count + 2).toString(16)).slice(-2));
                            } catch (e) {}
                        }
                        let value_result = parseInt(value.join(``), 16);
                        console.log("Short:name=\"" + tagname_result + "\" value=" + value_result);
                        i += (2 + tagname_count + value_count);
                        continue;
                    }
                    if (s == 3) {
                        tagname_count = allData.charCodeAt(i + 2) * 16 + allData.charCodeAt(i + 1);
                        var tagname = [];
                        for (tagname_loop = 1; tagname_loop <= tagname_count; tagname_loop++) {
                            try {
                                tagname.push(decodeURI("%" + (`00` + allData.charCodeAt(i + 2 + tagname_loop).toString(16)).slice(-2)));
                            } catch (e) {}
                        }
                        let tagname_result = tagname.join(``);
                        value_count = 4;
                        var value = [];
                        for (value_loop = value_count; value_loop >= 1; value_loop--) {
                            try {
                                value.push((`00` + allData.charCodeAt(i + value_loop + tagname_count + 2).toString(16)).slice(-2));
                            } catch (e) {}
                        }
                        let value_result = parseInt(value.join(``), 16);
                        console.log("Int:name=\"" + tagname_result + "\" value=" + value_result);
                        i += (2 + tagname_count + value_count);
                        continue;
                    }
                    if (s == 4) {
                        tagname_count = allData.charCodeAt(i + 2) * 16 + allData.charCodeAt(i + 1);
                        var tagname = [];
                        for (tagname_loop = 1; tagname_loop <= tagname_count; tagname_loop++) {
                            try {
                                tagname.push(decodeURI("%" + (`00` + allData.charCodeAt(i + 2 + tagname_loop).toString(16)).slice(-2)));
                            } catch (e) {}
                        }
                        let tagname_result = tagname.join(``);
                        value_count = 8;
                        var value = [];
                        for (value_loop = value_count; value_loop >= 1; value_loop--) {
                            try {
                                value.push((`00` + allData.charCodeAt(i + value_loop + tagname_count + 2).toString(16)).slice(-2));
                            } catch (e) {}
                        }
                        let value_result = parseInt(value.join(``), 16);
                        console.log("Long:name=\"" + tagname_result + "\" value=" + value_result);
                        i += (2 + tagname_count + value_count);
                        continue;
                    }
                }
                //要素削除
                $("#outputtext").remove();
                $("#img").remove();
                //要素追加
                $('#testuplode').append('<textarea id="outputtext" name="test" cols="50" rows="50"></textarea>');
                //textcontentに代入
                form.test.textContent = bin;
            }
            reader.readAsBinaryString(result);
        } else {
            //読み込んだファイルの中身を取得する(text)
            reader.readAsText(result);
            //ファイルの中身を取得後に処理を行う
            reader.addEventListener('load', function() {
                //要素削除
                $("#outputtext").remove();
                $("#img").remove();
                //要素追加
                $('#testuplode').append('<textarea id="outputtext" name="test" cols="50" rows="50"></textarea>');
                //textcontentに代入
                form.test.textContent = reader.result;
            });
        }

        //ファイルの名前をコンソールへ
        //console.log(result.name);
    })
});

$(function() {
    var h = $(window).height();

    $('#after-loading').css('display', 'none');
    $('#befor-loading ,#loader').height(h).css('display', 'block');
});
//1秒たったら強制的にロード画面を非表示
$(function() {
    setTimeout('stopload()', 1000);
});

function stopload() {
    $('#after-loading').css('display', 'block');
    $('#befor-loading').delay(900).fadeOut(800);
    $('#loader').delay(600).fadeOut(300);
}

function uuid() {
    var uuid = "",
        i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;

        if (i == 8 || i == 12 || i == 16 || i == 20) {
            uuid += "-"
        }
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}