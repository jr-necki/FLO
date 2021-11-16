package com.example.flo

import androidx.room.*


@Dao
interface SongDao {
    @Insert
    fun insert(song: Song)

    @Update
    fun update(song: Song)

    @Delete
    fun delete(song: Song)

    @Query("SELECT * FROM SongTable") // 테이블의 모든 값을 가져와라
    fun getSongs(): List<Song>

    @Query("SELECT * FROM SongTable WHERE id = :id")
    fun getSong(id: Int): Song

    @Query("UPDATE SongTable SET isLike= :isLike WHERE id = :id") // 특정 id인 것만 like업뎃
    fun updateIsLikeById(isLike :Boolean,id: Int)

    @Query("SELECT * FROM SongTable WHERE isLike = :isLike") // like 된 것만
    fun getLikedSongs(isLike: Boolean): List<Song>

    @Query("SELECT * FROM SongTable WHERE albumIdx = :albumIdx")
    fun getSongsInAlbum(albumIdx: Int): List<Song>
}