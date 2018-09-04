/**
 * Created by Administrator on 2018/5/2.
 */
function getHostName(){
    //如果项目为root目录则此处为空  如果不是则加文件名 如  "/net_shop"
    var projectName = "";
    var testNames = location.href.split("/");
    testNames.length = 3;
    var hostName = testNames.join("/")
    return hostName+projectName;
}
function getHostName2(){
    var testNames = location.href.split("/");
    testNames.length = 3;
    var hostName = testNames.join("/")
    return hostName;
}