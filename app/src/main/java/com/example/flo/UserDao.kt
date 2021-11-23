package com.example.flo

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface UserDao {
    @Insert
    fun insert(user:User)

    @Query("SELECT * FROM UserTable")
    fun getUsers(): List<User>

    @Query("SELECT * FROM USERTABLE WHERE email = :email AND password =:password")
    fun getUser(email: String, password:String) : User? // 없을 수도 있으니 null처리
}