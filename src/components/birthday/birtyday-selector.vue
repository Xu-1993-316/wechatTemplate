<template>
    <div class="birtyday-selector" @click="handleClick">
        <p @click="open">{{ value ? moment(value).format('YYYY-MM-DD') : '请选择' }} <img width="12px"  src="../../assets/image/jiantouxia.png" alt=""></p> 
        <mt-datetime-picker 
          ref="picker" 
          type="date" 
          yearFormat="{value} 年" 
          monthFormat="{value} 月"
          dateFormat="{value} 日" 
          :startDate="startDate" 
          :endDate="endDate" 
          :value="pickerValue" 
          :visible="visible"
          @confirm="handleConfirm">
        </mt-datetime-picker>
    </div>
</template>
<script>
    import moment from 'moment';

    export default {
        name: 'birtydaySelector',
        data: function() {
            return {
                'visible': false,
                'startDate': new Date(moment().add(-61, 'years').add(2, 'days')), // new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 60),
                'endDate': new Date(moment().add(-26, 'days')),
                'pickerValue': new Date('1985-01-01'), //this.value ? new Date(this.value) : new Date(),
                'lock': false
            }
        },
        props: ['value'],
        mounted: function() {
            this.$refs.picker.$el.addEventListener('click', () => {
                if (!this.$refs.picker.visible) {
                    this.stopScroll(false);
                }
            });
        },
        methods: {
            open: function() {
                if (this.lock) return;
                this.stopScroll(true);
                this.$refs.picker.open();

                setTimeout(() => {
                    document.getElementsByClassName('v-modal')[0].addEventListener('click', () => {
                        if (!this.$refs.picker.visible) {
                            this.stopScroll(false);
                        }
                    });
                }, 100)
            },
            handleConfirm: function(val) {
                this.lock = true;
                setTimeout(() => {
                    this.lock = false;
                }, 400);
                this.$emit('input', val);
            },
            moment: moment,
            stopScroll: function() {

                var handleStopScroll = function(evt) {
                    evt.preventDefault();
                }

                return function(tag) {
                    if (tag) {
                        console.log('禁止滚动');
                        document.getElementsByClassName('page')[0].addEventListener('touchmove', handleStopScroll);
                    } else {
                        console.log('开启滚动');
                        document.getElementsByClassName('page')[0].removeEventListener('touchmove', handleStopScroll);
                    }
                }
            }(),
            handleClick(evt) {
                evt.stopPropagation()
            }
        }
    }
</script>
<style scoped>
    .birtyday-selector {
        display: inline;
    }
    
    .birtyday-selector>p {
        font-size: 12px;
        color: #666666;
    }
    
    .birtyday-selector>p img {
        width: 12px;
        margin-left: 15px;
    }
    
    .overlay {
        display: block;
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, .6);
    }
    
    .select-container {
        position: fixed;
        left: 0;
        bottom: 1.546667rem;
        width: 100%;
        height: 1.226667rem;
        background-color: #fff;
    }
</style>