<template>
    <div id="page" class="page" @click="closeMore">
        <section class="sec1">
            <h3 style="margin-bottom: 0.6133333333333333rem;">以下内容，投保人承诺完全知晓所有被保险人健康/职业状况，履行如实告知义务。</h3>

            <p>若被保险人健康/职业状况与真实情况不符:</p>
            <p>(1)本公司有权不同意承保。</p>
            <p>(2)若发生保险事故，本公司不承担赔偿或给付保险金的责任，并有权不退还保险费。</p>
        </section>
        <div class="line"></div>
        <section class="sec2">
            <h2>被保险人是否有以下情况?</h2>
            <div class="condition">
                <div class="title">投保经历<span class="time-tag">2年内</span></div>
                <p>投保人身保险或健康保险时，有被保险公司拒保、延期、加费或者附加条件承保。</p>
            </div>
            <div class="condition">
                <div class="title">职业<span class="time-tag">目前</span></div>
                <p>专职或兼职从事属于<rejectGroup :jubaoData='jubaoData'>《拒保职业类别表》</rejectGroup> 中所列种类的职业。</p>
            </div>
            <div class="condition">
                <div class="title">女性被保人</div>
                <p>目前在妊娠过程中，或有医生或体检医师告知过被保险人有乳腺囊肿/结节、卵巢囊肿、宫外孕、子宫内膜异位、子宫肌腺症、子宫肌瘤、宫颈炎、阴道炎、盆腔炎、月经失调。</p>
            </div>
            <div class="condition">
                <div class="title">2周岁以下被保人</div>
                <p>出生时体重低于2.5公斤，或有早产、窒息或缺氧史、发育迟缓、脑瘫的情况。</p>
            </div>
            <div class="condition">
                <div class="title">存在下列症状或情况<span class="time-tag">2年内</span></div>
                <p>反复头痛、晕厥、胸痛、气急、紫绀、持续反复发热、抽搐、不明原因皮下出血点、咯血、反复呕吐、进食梗噎感或吞咽困难、呕血、浮肿、腹痛、黄疸(新生儿黄疸已治愈的除外)、便血、血尿、蛋白尿、肿块、消瘦(体重减轻5公斤以上)、职业病、酒精中毒、其他药品中毒、智能障碍、五官/脊柱/胸廓/四肢/手指/足趾缺损/畸形或功能障碍。</p>
            </div>
            <div class="condition">
                <div class="title">健康情况异常<span class="time-tag">1年内</span></div>
                <p>健康检查结果异常(如血液、超声、影像、内镜、病理检查)或长期服药(有规律的服药超过1个月)</p>
            </div>
            <div class="condition">
                <div class="title">住院/手术<span class="time-tag">2年内</span></div>
                <p>过去2年曾住院(不包括剖腹产/顺产/急性鼻炎/急性胃肠炎/急性肺炎/急性上呼吸道感染住院)或有医生提出进一步复查、治疗或手术建议。</p>
            </div>
            <h2>被保险人目前或过往有下列疾病、症状或情况:</h2>
            <table>
                <tbody>
                    <tr>
                        <td>高危<div class="h-icon"><img src="../../assets/image/h-icons/icon1.jpg"></div></td>
                        <td>良/恶性肿瘤、再生障碍性贫血、白血病、高血压、糖尿病</td>
                    </tr>
                    <tr>
                        <td>心/脑<div class="h-icon"><img src="../../assets/image/h-icons/icon2.jpg"></div></td>
                        <td>冠心病/冠状动脉狭窄、心肌梗死、心肌病、风湿性心脏病、心功能不全二级以上、脑梗死/脑出血</td>
                    </tr>
                    <tr>
                        <td>肺/气管<div class="h-icon"><img src="../../assets/image/h-icons/icon3.jpg"></div></td>
                        <td>慢性支气管炎、肺结核、慢性阻塞性肺病</td>
                    </tr>
                    <tr>
                        <td>肠/胆<div class="h-icon"><img src="../../assets/image/h-icons/icon4.jpg"></div></td>
                        <td>溃疡性结肠炎、克罗恩病(节段性肠炎)、慢性D  胆囊炎、胆石症、胆囊息肉、胃/十二指肠溃疡</td>
                    </tr>
                    <tr>
                        <td>肾/肝<div class="h-icon"><img src="../../assets/image/h-icons/icon5.jpg"></div></td>
                        <td>肾炎、肾功能不全、肾/输尿管结石、肝炎、肝硬化</td>
                    </tr>
                    <tr>
                        <td>肢体<div class="h-icon"><img src="../../assets/image/h-icons/icon6.jpg"></div></td>
                        <td>下肢静脉曲张、椎间盘突出症、瘫痪、类风湿性关节炎、痛风性关节炎</td>
                    </tr>
                    <tr>
                        <td>神经<div class="h-icon"><img src="../../assets/image/h-icons/icon7.jpg"></div></td>
                        <td>帕金森氏病、癫痫、精神病</td>
                    </tr>
                    <tr>
                        <td>其他<div class="h-icon"><img src="../../assets/image/h-icons/icon8.jpg"></div></td>
                        <td>甲亢、甲状腺结节、系统性红斑狼疮、传导性耳聋、先天性疾病</td>
                    </tr>
                    <tr>
                        <td>药物<div class="h-icon"><img src="../../assets/image/h-icons/icon9.jpg"></div></td>
                        <td>滥用药物史、酗酒史
                            <img class="more" src="../../assets/image/more.png" alt="查看更多" @click="more" />
                            <div class="qipao" v-show="qipaoVisible">酗酒是指平均每日酒精摄取量超过60克(男性）或40克（女性），每10克酒精摄取量相当于1杯（330ml）啤酒或半杯(150ml）葡萄酒或者45ml白酒</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        
        <footer>
            <div class="footer-btn" @click="reject()" click-tag="部分为是">
                <!-- <img src="../../assets/image/warning2.png" /> -->
                有部分问题
            </div>
            <div class="footer-btn" @click="toInsure" click-tag="以上全否">
                <!-- <img src="../../assets/image/bingo.png" /> -->
                确认无以上任一问题
            </div>
        </footer>
    </div>
</template>
<script src="./script.js"></script>
<style scoped src="./style.css"></style>