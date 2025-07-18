document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.getElementById('status');
    statusElement.textContent = "جارٍ إرسال الرسالة...";
    statusElement.className = "status sending";
    
    // إرسال البريد عند تحميل الصفحة
    sendAutoEmail();
    
    async function sendAutoEmail() {
        // البريد المستهدف abdkww2030@gmail.com
        const templateParams = {
            to_email: "abdkww2030@gmail.com",
            message: "مرحبا! هذه رسالة تلقائية تم إرسالها عند فتح التطبيق."
        };
        
        try {
            const response = await emailjs.send(
                "service_nh0nqsg",   // Service ID
                "template_t4tf2rt",   // Template ID
                templateParams
            );
            
            console.log("تم الإرسال بنجاح:", response);
            statusElement.textContent = "✅ تم إرسال الرسالة بنجاح!";
            statusElement.className = "status success";
            
        } catch (error) {
            console.error("فشل الإرسال:", error);
            
            // عرض تفاصيل الخطأ للمستخدم
            let errorMsg = "حدث خطأ غير متوقع";
            if (error.status) errorMsg = `خطأ ${error.status}: ${error.text}`;
            else if (error.message) errorMsg = error.message;
            
            statusElement.textContent = `❌ حدث خطأ: ${errorMsg}`;
            statusElement.className = "status error";
            
            // إضافة زر إعادة المحاولة في حالة الخطأ
            const retryBtn = document.createElement('button');
            retryBtn.textContent = "إعادة المحاولة";
            retryBtn.className = "retry-btn";
            retryBtn.onclick = sendAutoEmail;
            statusElement.after(retryBtn);
        }
    }
});