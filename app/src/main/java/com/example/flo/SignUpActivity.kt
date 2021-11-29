package com.example.flo

import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.flo.databinding.ActivityLoginBinding
import com.example.flo.databinding.ActivitySignupBinding
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class SignUpActivity : AppCompatActivity(),SignUpView {
    lateinit var binding: ActivitySignupBinding

    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        binding = ActivitySignupBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.finishIv.setOnClickListener {
            signUp()

        }
    }

    private fun getUser(): User {
        val email : String = binding.emailIdEt.text.toString()+"@"+binding.emailSiteEt.text.toString()
        val pwd : String = binding.pwEt.text.toString()
        val name : String= binding.nameEt.text.toString()

        return User(email,pwd,name)
    }

//    private fun signUp(){
//        if(binding.emailIdEt.text.toString().isEmpty() || binding.emailSiteEt.text.toString().isEmpty()){
//            Toast.makeText(this,"이메일 형식이 잘못되었습니다.", Toast.LENGTH_SHORT).show()
//            return
//        }
//        if(binding.pwEt.text.toString() != binding.pwCheckEt.text.toString()){
//            Toast.makeText(this,"비밀번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show()
//            return
//        }
//        val userDB = SongDatabase.getInstance(this)!!
//        val users = userDB.userDao().getUsers()
//        for(index in users.indices){
//            if(binding.nameEt.text.toString()==(users[index].name)){
//                Toast.makeText(this,"이미 있는 이름입니다.", Toast.LENGTH_SHORT).show()
//                return
//            }
//        }
//
//        userDB.userDao().insert(getUser())
//        Log.d("SINGUP",users.toString())
//        //로그인 화면으로
//        finish()
//    }
    private fun signUp(){
    if(binding.emailIdEt.text.toString().isEmpty() || binding.emailSiteEt.text.toString().isEmpty()){
            Toast.makeText(this,"이메일 형식이 잘못되었습니다.", Toast.LENGTH_SHORT).show()
            return
        }
        if(binding.pwEt.text.toString() != binding.pwCheckEt.text.toString()){
            Toast.makeText(this,"비밀번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show()
            return
        }
        val userDB = SongDatabase.getInstance(this)!!
        val users = userDB.userDao().getUsers()
        for(index in users.indices){
            if(binding.nameEt.text.toString()==(users[index].name)){
                Toast.makeText(this,"이미 있는 이름입니다.", Toast.LENGTH_SHORT).show()
                return
            }
        }

    val authService = AuthService()
    authService.setSignUpView(this)

    authService.signUp((getUser()))

    Log.d("SIGNUPPACT/ASUNC", "HELLO")
    }

    override fun onSignUpLoading() {
       binding.signUpLoadingPb.visibility=View.VISIBLE
    }

    override fun onSignUpSuccess() {
        binding.signUpLoadingPb.visibility = View.GONE
        finish()
    }

    override fun onSignUpFailure(code: Int, message: String) {
        binding.signUpLoadingPb.visibility=View.GONE

        when(code){
            2016,2017 -> {
                binding.emailErrorTv.visibility = View.VISIBLE
                binding.emailErrorTv.text = message
            }
        }

    }
}