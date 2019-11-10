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
        console.log(result.name);
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