<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,   /// dateClick은 FullCalendar 설치할 때 다운받아진 컴포넌트에 정의되었다. 'date 클릭시 이거 해라' 겠지 아마

        events: [
          { title: 'event 1', date: '2024-11-25' },
          { title: 'event 2', date: '2024-11-26' },
        ]
      }
    }
  },
  methods: {
    handleDateClick: function(arg) { // 데이터 란에 dateClick에서 
      alert('date click! ' + arg.dateStr) // arg는 data 변수이름, fullcalendar 안에 정의된 dateStr 불러와서 지정해주는거임 
      this.calendarOptions.events.push({ title : '약속', date : '2024-11-26'})
    }
  },
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>